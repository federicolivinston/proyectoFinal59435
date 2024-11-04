import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { User } from '../models/userModels';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { generateRandomString } from '../../common/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authUser$ = new BehaviorSubject<null | User>(null);
  private profile:string = '';
  public authUser$ = this._authUser$.asObservable();

  constructor(private router: Router, private usersService: UsersService) {}

  login(userName: string, password:string): Observable<User> {
    
    return this.usersService.getUserByUsernamePass(userName, password).pipe(
      switchMap((user: User | null) => {
        if (!user) {
          return throwError(() => new Error('Los datos son inválidos'));
        }
        this._authUser$.next(user);
        const token=generateRandomString(14)+user.id+generateRandomString(11);
        localStorage.setItem('tokenFlivingston', token); // genero el token con el id del usuario
        return of(user);
      }),
      catchError((error) => throwError(() => error))
    );
  }

  logout() {
    this._authUser$.next(null);
    localStorage.removeItem('tokenFlivingston');
    this.router.navigate(['']);
  }

  verifyToken(checkProfile:boolean, profile: string): Observable<boolean> {
    let isValid=false;
    this.profile='';

    const token = localStorage.getItem('tokenFlivingston');
    const userId = token ? token.slice(14, token.length-11) : '';
    if (userId.length > 0){
      return this.usersService.getUserById(userId).pipe(
        switchMap((user: User | null) => {
          if (user) {
            
            if (!checkProfile || user["profile"]==profile)
              {
                this._authUser$.next(user);
                this.profile=user["profile"];
                isValid=true;
              }else{
                isValid=false;
              }            
          }else{
            this._authUser$.next(null);
          }
          return of(isValid);
        }),
        catchError((error) => throwError(() => error))
      );
    } else{
      return of(isValid);
    }
  }

  getProfile():string {
    return this.profile;
  }
}
