import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscription from './inscription.reducer';

export const selectInscriptionState = createFeatureSelector<fromInscription.State>(
  fromInscription.inscriptionFeatureKey
);

export const selectInscriptions = createSelector(
  selectInscriptionState,
  (state) => state.Inscriptions
);

export const selectLoadInscriptionsError = createSelector(
  selectInscriptionState,
  (state) => state.loadInscriptionsError
);

export const selectIsLoadingInscriptions = createSelector(
  selectInscriptionState,
  (state) => state.isLoadingInscriptions
);

export const selectFatherId = createSelector(
  selectInscriptionState,
  (state) => state.fatherId
);

// Selector para obtener inscriptionsType
export const selectInscriptionsType = createSelector(
  selectInscriptionState,
  (state) => state.inscriptionsType
);

export const selectFormOptions = createSelector(
  selectInscriptionState,
  (state) => state.FormOptions
);