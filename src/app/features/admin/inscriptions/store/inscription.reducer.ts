import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionActions } from './inscription.actions';
import { Inscription, Option } from '../../../../core/models/inscriptionModels';

export const inscriptionFeatureKey = 'inscription';

export interface State {
  isLoadingInscriptions: boolean;
  loadInscriptionsError: boolean;
  inscriptionsType: string;
  fatherId: string;
  Inscriptions: Inscription[];
  FormOptions: Option[],
}

export const initialState: State = {
  isLoadingInscriptions:false,
  loadInscriptionsError:false,
  inscriptionsType: '',
  fatherId: '',
  Inscriptions: [],
  FormOptions: [],
};

export const reducer = createReducer(
  initialState,

  on(InscriptionActions.loadInscriptions, (state, {id, tipo}) => {
    return {
      ...state,
      inscriptionsType: tipo,
      fatherId: id,
      isLoadingInscriptions: true,
      loadInscriptionsError: false,
    };
  }),

  on(InscriptionActions.loadInscriptionsSuccess, (state, action) => {
    return {
      ...state,
      Inscriptions: action.data,
      loadInscriptionsError: false,
      isLoadingInscriptions: false,
    };
  }),

  on(InscriptionActions.loadInscriptionsFailure, (state) => {
    return {
      ...state,
      ...initialState,
      loadInscriptionsError: true,
      isLoadingInscriptions: false,
    };
  }),

  on(InscriptionActions.createInscription, (state, {data}) => {
    return {
      ...state,
      loadInscriptionsError: true,
      isLoadingInscriptions: false,
    };
  }),

  on(InscriptionActions.createInscriptionSuccess, (state) => {
    return {
      ...state,
      loadInscriptionsError: false,
      isLoadingInscriptions: false,
    };
  }),
  
  on(InscriptionActions.createInscriptionFailure, (state) => {
    return {
      ...state,
      ...initialState,
      loadInscriptionsError: true,
      isLoadingInscriptions: false,
    };
  }),

  on(InscriptionActions.deleteInscription, (state, {data}) => {
    return {
      ...state,
      loadInscriptionsError: true,
      isLoadingInscriptions: false,
    };
  }),

  on(InscriptionActions.deleteInscriptionSuccess, (state) => {
    return {
      ...state,
      loadInscriptionsError: false,
      isLoadingInscriptions: false,
    };
  }),

  on(InscriptionActions.deleteInscriptionFailure, (state) => {
    return {
      ...state,
      ...initialState,
      loadInscriptionsError: true,
      isLoadingInscriptions: false,
    };
  }),

  on(InscriptionActions.loadFormOptions, (state) => {
    return {
      ...state,
      loadInscriptionsError: true,
      isLoadingInscriptions: false,
    };
  }),

  on(InscriptionActions.loadFormOptionsSuccess, (state, action) => {
    return {
      ...state,
      FormOptions: action.data,
      loadInscriptionsError: false,
      isLoadingInscriptions: false,
    };
  }),

  on(InscriptionActions.loadFormOptionsFailure, (state) => {
    return {
      ...state,
      ...initialState,
      loadInscriptionsError: true,
      isLoadingInscriptions: false,
    };
  }),

);
export const inscriptionFeature = createFeature({
  name: inscriptionFeatureKey,
  reducer,
});

