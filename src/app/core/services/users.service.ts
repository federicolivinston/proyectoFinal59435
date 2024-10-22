import { Injectable } from '@angular/core';
import { User } from '../models/userModels';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';

let USERS_DDBB: User[] = [
  {idUser: 'WRUJBZ', firstName: 'Federico', lastName:'Livingston', userName: 'flivingston', password: 'admin', profile: 'admin',createdAt: new Date()},
  {idUser: 'WRUJKY', firstName: 'Fernando', lastName:'Lopez', userName: 'flopez', password: 'operator', profile: 'operator',createdAt: new Date()},
];

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  getUsers(): Observable<User[]> {
    return new Observable((observer) => {
      setInterval(() => {
        observer.next(USERS_DDBB);
        observer.complete();
      }, 3000);
    });
  } 

  getUserById(id:string): Observable<User> {
    return new Observable((observer) => {
      setInterval(() => {
        observer.next(USERS_DDBB.find((user)=>user.idUser==id));
        observer.complete();
      }, 3000);
    });
  }

  getUserByUsernamePass(username:string, pass:string): Observable<User> {
    return new Observable((observer) => {
      setInterval(() => {
        observer.next(USERS_DDBB.find((user)=>user.userName==username && user.password == pass));
        observer.complete();
      }, 3000);
    });
  }

  removeStudentById(id: string): Observable<User[]> {
    USERS_DDBB = USERS_DDBB.filter((user) => user.idUser != id);
    return of(USERS_DDBB).pipe(delay(1000));
  }

  updateStudentById(id: string, update: Partial<User>) {
    USERS_DDBB = USERS_DDBB.map((user) =>
      user.idUser === id ? { ...user, ...update } : user
    );

    return new Observable<User[]>((observer) => {
      setInterval(() => {
        observer.next(USERS_DDBB);
        observer.complete();
      }, 1000);
    });
  }

}
