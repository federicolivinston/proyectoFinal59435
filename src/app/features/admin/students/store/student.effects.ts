import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { StudentActions } from './student.actions';
import { Action } from '@ngrx/store';
import { StudentsService } from '../../../../core/services/students.service';
import { of } from 'rxjs';

@Injectable()
export class StudentEffects {

  loadStudents$: Actions<Action<string>>;
  //loadDegrees$: Actions<Action<string>>;
  createStudent$: Actions<Action<string>>;
  createStudentSucces$: Actions<Action<string>>;
  deleteStudent$: Actions<Action<string>>;
  deleteStudentSucces$: Actions<Action<string>>;
  updateStudent$: Actions<Action<string>>;
  updateStudentSucces$: Actions<Action<string>>;

  constructor(private actions$: Actions, private StudentService: StudentsService) {
    this.loadStudents$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(StudentActions.loadStudents),
        concatMap((action)=>
          this.StudentService
            .getStudents()
            .pipe(
              map((response)=>StudentActions.loadStudentsSuccess({data: response}),
              catchError((error)=>of(StudentActions.loadStudentsFailure({error: true})))
              )
            )
          )
      );
    });

   /* this.loadDegrees$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(StudentActions.loadDegrees),
        concatMap((action)=>
          this.StudentService
            .getDegrees()
            .pipe(
              map((response)=>StudentActions.loadDegreesSuccess({data: response}),
              catchError((error)=>of(StudentActions.loadDegreesFailure({error: true})))
              )
            )
          )
      );
    });*/

    this.createStudent$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(StudentActions.createStudent), 
        concatMap((action) => { 
          return this.StudentService.createStudent(action.data).pipe(
            map((newStudent) => StudentActions.createStudentSuccess({ data: newStudent })),
            catchError((error) =>
              of(StudentActions.createStudentFailure({ error }))  
            )
          );
        })
      );
    });

    this.createStudentSucces$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(StudentActions.createStudentSuccess),
        map(() => StudentActions.loadStudents())
      );
    });

    this.deleteStudent$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(StudentActions.deleteStudent), 
        concatMap((action) => { 
          return this.StudentService.removeStudentById(action.data).pipe(
            map((response) => StudentActions.deleteStudentSuccess({ data: response })),
            catchError((error) =>
              of(StudentActions.createStudentFailure({ error }))  
            )
          );
        })
      );
    });

    this.deleteStudentSucces$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(StudentActions.deleteStudentSuccess),
        map(() => StudentActions.loadStudents())
      );
    });

    this.updateStudent$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(StudentActions.updateStudent), 
        concatMap((action) => { 
          return this.StudentService.updateStudentById(action.id, action.data).pipe(
            map((response) => StudentActions.updateStudentSuccess({ data: response })),
            catchError((error) =>
              of(StudentActions.updateStudentFailure({ error }))  
            )
          );
        })
      );
    });

    this.updateStudentSucces$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(StudentActions.updateStudentSuccess),
        map(() => StudentActions.loadStudents())
      );
    });
  }
}
