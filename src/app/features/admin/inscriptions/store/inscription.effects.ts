import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { Action, select, Store } from '@ngrx/store';
import { combineLatest, of } from 'rxjs';
import { InscriptionsService } from '../../../../core/services/inscriptions.service';
import { InscriptionActions } from './inscription.actions';
import { selectFatherId, selectInscriptionsType } from './inscription.selectors';

@Injectable()
export class InscriptionEffects {

  loadInscriptions$: Actions<Action<string>>;
  createInscription$: Actions<Action<string>>;
  createInscriptionSucces$: Actions<Action<string>>;
  deleteInscription$: Actions<Action<string>>;
  deleteInscriptionSucces$: Actions<Action<string>>;
  loadFormOptions$: Actions<Action<string>>;

  constructor(private actions$: Actions, private InscriptionService: InscriptionsService, private store: Store) {
    this.loadInscriptions$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(InscriptionActions.loadInscriptions),
        concatMap((action)=>
          this.InscriptionService
            .getInscriptionsById(action.id,action.tipo)
            .pipe(
              map((response)=>InscriptionActions.loadInscriptionsSuccess({data: response}),
              catchError((error)=>of(InscriptionActions.loadInscriptionsFailure({error: true})))
              )
            )
          )
      );
    });

    this.createInscription$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(InscriptionActions.createInscription), 
        concatMap((action) => {
          return this.InscriptionService.createInscription(action.data.idChair, action.data.idStudent).pipe(
            map((newInscription) => InscriptionActions.createInscriptionSuccess({ data: newInscription })),
            catchError((error) =>
              of(InscriptionActions.createInscriptionFailure({ error }))  
            )
          );
        })
      );
    });

    this.createInscriptionSucces$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(InscriptionActions.createInscriptionSuccess),
        switchMap(() =>
          combineLatest([this.store.pipe(select(selectFatherId)), this.store.pipe(select(selectInscriptionsType))]).pipe(
            map(([fatherId, inscriptionsType]) => {
              // Despachar la acción loadInscriptions con los parámetros obtenidos
              return InscriptionActions.loadInscriptions({
                id: fatherId,
                tipo: inscriptionsType
              });
            })
          )
        )
      );
    });

    this.deleteInscription$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(InscriptionActions.deleteInscription), 
        concatMap((action) => { 
          return this.InscriptionService.removeInscriptionById(action.data).pipe(
            map((response) => InscriptionActions.deleteInscriptionSuccess({ data: response })),
            catchError((error) =>
              of(InscriptionActions.createInscriptionFailure({ error }))  
            )
          );
        })
      );
    });

    this.deleteInscriptionSucces$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(InscriptionActions.deleteInscriptionSuccess),
        switchMap(() =>
          combineLatest([this.store.pipe(select(selectFatherId)), this.store.pipe(select(selectInscriptionsType))]).pipe(
            map(([fatherId, inscriptionsType]) => {
              // Despachar la acción loadInscriptions con los parámetros obtenidos
              return InscriptionActions.loadInscriptions({
                id: fatherId,
                tipo: inscriptionsType
              });
            })
          )
        )
      );
    });

    this.loadFormOptions$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(InscriptionActions.loadFormOptions),
        concatMap((action)=>
          this.InscriptionService
            .getFormOptions(action.id,action.tipo)
            .pipe(
              map((response)=>InscriptionActions.loadFormOptionsSuccess({data: response}),
              catchError((error)=>of(InscriptionActions.loadFormOptionsFailure({error: true})))
              )
            )
          )
      );
    });
  }  
}
