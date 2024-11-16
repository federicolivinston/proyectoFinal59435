import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { ChairActions } from './chair.actions';
import { Action } from '@ngrx/store';
import { ChairsService } from '../../../../core/services/chairs.service';
import { CoursesService } from '../../../../core/services/courses.service';
import { of } from 'rxjs';

@Injectable()
export class ChairEffects {


  loadChairs$: Actions<Action<string>>;
  loadCourses$: Actions<Action<string>>;
  createChair$: Actions<Action<string>>;
  createChairSucces$: Actions<Action<string>>;
  deleteChair$: Actions<Action<string>>;
  deleteChairSucces$: Actions<Action<string>>;
  updateChair$: Actions<Action<string>>;
  updateChairSucces$: Actions<Action<string>>;

  constructor(private actions$: Actions, private ChairService: ChairsService, private CourseService: CoursesService) {
    this.loadChairs$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ChairActions.loadChairs),
        concatMap((action)=>
          this.ChairService
            .getChairs()
            .pipe(
              map((response)=>ChairActions.loadChairsSuccess({data: response}),
              catchError((error)=>of(ChairActions.loadChairsFailure({error: true})))
              )
            )
          )
      );
    });

    this.loadCourses$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ChairActions.loadChairsCourses),
        concatMap((action)=>
          this.CourseService
            .getCourses()
            .pipe(
              map((response)=>ChairActions.loadChairsCoursesSuccess({data: response}),
              catchError((error)=>of(ChairActions.loadChairsCoursesFailure({error: true})))
              )
            )
          )
      );
    });

    this.createChair$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ChairActions.createChair), 
        concatMap((action) => { 
          return this.ChairService.createChair(action.data).pipe(
            map((newChair) => ChairActions.createChairSuccess({ data: newChair })),
            catchError((error) =>
              of(ChairActions.createChairFailure({ error }))  
            )
          );
        })
      );
    });

    this.createChairSucces$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ChairActions.createChairSuccess),
        map(() => ChairActions.loadChairs())
      );
    });

    this.deleteChair$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ChairActions.deleteChair), 
        concatMap((action) => { 
          return this.ChairService.removeChairById(action.data).pipe(
            map((response) => ChairActions.deleteChairSuccess({ data: response })),
            catchError((error) =>
              of(ChairActions.createChairFailure({ error }))  
            )
          );
        })
      );
    });

    this.deleteChairSucces$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ChairActions.deleteChairSuccess),
        map(() => ChairActions.loadChairs())
      );
    });

    this.updateChair$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ChairActions.updateChair), 
        concatMap((action) => { 
          return this.ChairService.updateChairById(action.id, action.data).pipe(
            map((response) => ChairActions.updateChairSuccess({ data: response })),
            catchError((error) =>
              of(ChairActions.updateChairFailure({ error }))  
            )
          );
        })
      );
    });

    this.updateChairSucces$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ChairActions.updateChairSuccess),
        map(() => ChairActions.loadChairs())
      );
    });
  }
}
