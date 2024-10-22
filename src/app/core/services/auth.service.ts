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
  public authUser$ = this._authUser$.asObservable();

  constructor(private router: Router, private usersService: UsersService) {}

  login(userName: string, password:string): Observable<User> {
    return this.usersService.getUserByUsernamePass(userName, password).pipe(
      switchMap((user: User | null) => {
        if (!user) {
          return throwError(() => new Error('Los datos son inválidos'));
        }
        this._authUser$.next(user);
        const token=generateRandomString(14)+user.idUser+generateRandomString(11);
        localStorage.setItem('token', token); // genero el token con el id del usuario
        return of(user);
      }),
      catchError((error) => throwError(() => error))
    );
  }

  logout() {
    this._authUser$.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login']);
  }

  verifyToken(): Observable<boolean> {
    let isValid=false;
    const token = localStorage.getItem('token');
    const userId = token ? token.slice(14, 20) : '';
    console.log(token);
    console.log(userId);
    return this.usersService.getUserById(userId).pipe(
      switchMap((user: User | null) => {
        if (user) {
          this._authUser$.next(user);
          isValid=true;
        }else{
          this._authUser$.next(null);
        }
        return of(isValid);
      }),
      catchError((error) => throwError(() => error))
    );
  }
}
