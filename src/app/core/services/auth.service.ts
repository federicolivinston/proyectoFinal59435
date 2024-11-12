import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { User } from '../models/userModels';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { generateRandomString } from '../../common/utils/utils';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/auth.actions';
import { selectAutheticatedUser, selectUserProfile } from '../../store/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authUser$: Observable <User | null>;

  constructor(
      private router: Router, 
      private usersService: UsersService,
      private store: Store
    ) {
      this.authUser$= this.store.select(selectAutheticatedUser );
    }

  login(userName: string, password:string): Observable<User> {
    
    return this.usersService.getUserByUsernamePass(userName, password).pipe(
      switchMap((authUser: User | null) => {
        if (!authUser) {
          return throwError(() => new Error('Los datos son inválidos'));
        }
        this.store.dispatch(AuthActions.setAuthenticatedUser({user: authUser}));
        const token=generateRandomString(14)+authUser.id+generateRandomString(11);
        localStorage.setItem('tokenFlivingston', token); // genero el token con el id del usuario
        return of(authUser);
      }),
      catchError((error) => throwError(() => error))
    );
  }

  logout() {
    this.store.dispatch(AuthActions.unsetAuthenticatedUser());
    localStorage.removeItem('tokenFlivingston');
    this.router.navigate(['']);
  }

  verifyToken(checkProfile:boolean, profile: string): Observable<boolean> {
    let isValid=false;

    const token = localStorage.getItem('tokenFlivingston');
    const userId = token ? token.slice(14, token.length-11) : '';
    if (userId.length > 0){
      return this.usersService.getUserById(userId).pipe(
        switchMap((user: User | null) => {
          if (user) {
            
            if (!checkProfile || user["profile"]==profile)
              {
                this.store.dispatch(AuthActions.setAuthenticatedUser({user: user}));
                isValid=true;
              }else{
                isValid=false;
              }            
          }else{
            this.store.dispatch(AuthActions.unsetAuthenticatedUser());
          }
          return of(isValid);
        }),
        catchError((error) => throwError(() => error))
      );
    } else{
      return of(isValid);
    }
  }

  getProfile(): Observable<string> {
    return this.store.select(selectUserProfile);
  }
}
