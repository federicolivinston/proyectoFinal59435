import { Injectable } from '@angular/core';
import { Profile, User } from '../models/userModels';
import { BehaviorSubject, concatMap, delay, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { generateRandomString } from '../../common/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseURL = environment.apiBaseUrl;
  private baseEndPoint = environment.usersEndPoint;
  private profileEndPoint = environment.profilesEndPoint;

  constructor(private httpClient: HttpClient) {}
  
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseURL}/${this.baseEndPoint}`);
  } 

  getUserById(id:string): Observable<User | null> {
    return this.httpClient.get<User>(`${this.baseURL}/${this.baseEndPoint}/${id}`).pipe(
      map((users)=>{
        if (users) {
          return users;
        }else{
          return null;
        }
      })
    );
  }

  getUserByUsernamePass(username:string, password:string): Observable<User | null> {
    return this.httpClient.get<User[]>(`${this.baseURL}/${this.baseEndPoint}/?userName=${username}&password=${password}`)
    .pipe(
      map((users)=>{
        if (!!users[0]) {
          return users[0];
        }else{
          return null;
        }
      })
     ) ;
  }

  createUser(data: Omit<User, 'id'>): Observable<User> {
    return this.httpClient.post<User>(`${this.baseURL}/${this.baseEndPoint}`, {
      ...data,
      createdAt: new Date().toISOString(),
    });
  }

  removeUserById(id: string): Observable<User[]> {
    return this.httpClient
      .delete<User>(`${this.baseURL}/${this.baseEndPoint}/${id}`)
      .pipe(concatMap(() => this.getUsers()));
  }

  updateUserById(id: string, update: Partial<User>) {
    return this.httpClient
      .patch<User>(`${this.baseURL}/${this.baseEndPoint}/${id}`, update)
      .pipe(concatMap(() => this.getUsers()));
  }

  getProfiles(): Observable<Profile[]> {
    return this.httpClient.get<Profile[]>(`${this.baseURL}/${this.profileEndPoint}`);
  }
}
