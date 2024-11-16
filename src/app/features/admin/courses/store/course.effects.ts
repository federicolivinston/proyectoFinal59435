import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { CourseActions } from './course.actions';
import { Action } from '@ngrx/store';
import { CoursesService } from '../../../../core/services/courses.service';
import { of } from 'rxjs';

@Injectable()
export class CourseEffects {

  loadCourses$: Actions<Action<string>>;
  loadDegrees$: Actions<Action<string>>;
  createCourse$: Actions<Action<string>>;
  createCourseSucces$: Actions<Action<string>>;
  deleteCourse$: Actions<Action<string>>;
  deleteCourseSucces$: Actions<Action<string>>;
  updateCourse$: Actions<Action<string>>;
  updateCourseSucces$: Actions<Action<string>>;

  constructor(private actions$: Actions, private courseService: CoursesService) {
    this.loadCourses$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CourseActions.loadCourses),
        concatMap((action)=>
          this.courseService
            .getCourses()
            .pipe(
              map((response)=>CourseActions.loadCoursesSuccess({data: response}),
              catchError((error)=>of(CourseActions.loadCoursesFailure({error: true})))
              )
            )
          )
      );
    });

    this.loadDegrees$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CourseActions.loadDegrees),
        concatMap((action)=>
          this.courseService
            .getDegrees()
            .pipe(
              map((response)=>CourseActions.loadDegreesSuccess({data: response}),
              catchError((error)=>of(CourseActions.loadDegreesFailure({error: true})))
              )
            )
          )
      );
    });

    this.createCourse$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CourseActions.createCourse), 
        concatMap((action) => { 
          return this.courseService.createCourse(action.data).pipe(
            map((newCourse) => CourseActions.createCourseSuccess({ data: newCourse })),
            catchError((error) =>
              of(CourseActions.createCourseFailure({ error }))  
            )
          );
        })
      );
    });

    this.createCourseSucces$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CourseActions.createCourseSuccess),
        map(() => CourseActions.loadCourses())
      );
    });

    this.deleteCourse$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CourseActions.deleteCourse), 
        concatMap((action) => { 
          return this.courseService.removeCourseById(action.data).pipe(
            map((response) => CourseActions.deleteCourseSuccess({ data: response })),
            catchError((error) =>
              of(CourseActions.createCourseFailure({ error }))  
            )
          );
        })
      );
    });

    this.deleteCourseSucces$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CourseActions.deleteCourseSuccess),
        map(() => CourseActions.loadCourses())
      );
    });

    this.updateCourse$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CourseActions.updateCourse), 
        concatMap((action) => { 
          return this.courseService.updateCourseById(action.id, action.data).pipe(
            map((response) => CourseActions.updateCourseSuccess({ data: response })),
            catchError((error) =>
              of(CourseActions.updateCourseFailure({ error }))  
            )
          );
        })
      );
    });

    this.updateCourseSucces$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CourseActions.updateCourseSuccess),
        map(() => CourseActions.loadCourses())
      );
    });
  }
  
}
