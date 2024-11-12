import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { UserActions } from './user.actions';
import { UsersService } from '../../../../core/services/users.service';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {

  loadUsers$: Actions<Action<string>>;
  loadProfiles$: Actions<Action<string>>;
  createUser$: Actions<Action<string>>;
  createUserSucces$: Actions<Action<string>>;
  deleteUser$: Actions<Action<string>>;
  deleteUserSucces$: Actions<Action<string>>;
  updateUser$: Actions<Action<string>>;
  updateUserSucces$: Actions<Action<string>>;

  constructor(private actions$: Actions, private userService: UsersService) {

    this.loadUsers$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.loadUsers),
        concatMap((action)=>
          this.userService
            .getUsers()
            .pipe(
              map((response)=>UserActions.loadUsersSuccess({data: response}),
              catchError((error)=>of(UserActions.loadUsersFailure({error: true})))
              )
            )
          )
      );
    });

    this.loadProfiles$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.loadProfiles),
        concatMap((action)=>
          this.userService
            .getProfiles()
            .pipe(
              map((response)=>UserActions.loadProfilesSuccess({data: response}),
              catchError((error)=>of(UserActions.loadProfilesFailure({error: true})))
              )
            )
          )
      );
    });

    this.createUser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.createUser), 
        concatMap((action) => { 
          console.log(action.data);
          return this.userService.createUser(action.data).pipe(
            map((newUser) => UserActions.createUserSuccess({ data: newUser })),
            catchError((error) =>
              of(UserActions.createUserFailure({ error }))  
            )
          );
        })
      );
    });

    this.createUserSucces$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.createUserSuccess),
        map(() => UserActions.loadUsers())
      );
    });

    this.deleteUser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.deleteUser), 
        concatMap((action) => { 
          console.log(action.data);
          return this.userService.removeUserById(action.data).pipe(
            map((response) => UserActions.deleteUserSuccess({ data: response })),
            catchError((error) =>
              of(UserActions.createUserFailure({ error }))  
            )
          );
        })
      );
    });

    this.deleteUserSucces$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.deleteUserSuccess),
        map(() => UserActions.loadUsers())
      );
    });

    this.updateUser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.updateUser), 
        concatMap((action) => { 
          console.log(action.data);
          return this.userService.updateUserById(action.id, action.data).pipe(
            map((response) => UserActions.updateUserSuccess({ data: response })),
            catchError((error) =>
              of(UserActions.updateUserFailure({ error }))  
            )
          );
        })
      );
    });

    this.updateUserSucces$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.updateUserSuccess),
        map(() => UserActions.loadUsers())
      );
    });
  }
  
}
