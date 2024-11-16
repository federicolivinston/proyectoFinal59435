import { createFeature, createReducer, on } from '@ngrx/store';
import { ChairActions } from './chair.actions';
import { ChairDetail } from '../../../../core/models/chairModels';
import { Course } from '../../../../core/models/courseModels';

export const chairFeatureKey = 'chair';

export interface State {
  isLoadingChairs: boolean;
  loadChairsError: boolean;
  Chairs: ChairDetail[];
  ChairsCourses: Course[];
}

export const initialState: State = {
  isLoadingChairs:false,
  loadChairsError:false,
  Chairs: [],
  ChairsCourses: [],
};

export const reducer = createReducer(
  initialState,
  on(ChairActions.loadChairs, (state) => {
    return {
      ...state,
      isLoadingChairs: true,
      loadChairsError: false,
    };
  }),

  on(ChairActions.loadChairsSuccess, (state, action) => {
    return {
      ...state,
      Chairs: action.data,
      loadChairsError: false,
      isLoadingChairs: false,
    };
  }),

  on(ChairActions.loadChairsFailure, (state) => {
    return {
      ...state,
      ...initialState,
      loadChairsError: true,
      isLoadingChairs: false,
    };
  }),

  on(ChairActions.loadChairsCourses, (state) => {
    return {
      ...state,
    };
  }),

  on(ChairActions.loadChairsCoursesSuccess, (state, action) => {
    return {
      ...state,
      ChairsCourses: action.data,
    };
  }),

  on(ChairActions.loadChairsCoursesFailure, (state) => {
    return {
      ...state,
      ...initialState,
    };
  }),

  on(ChairActions.createChair, (state, {data}) => {
    return {
      ...state,
      loadChairsError: true,
      isLoadingChairs: false,
    };
  }),

  on(ChairActions.createChairSuccess, (state) => {
    return {
      ...state,
      loadChairsError: false,
      isLoadingChairs: false,
    };
  }),
  
  on(ChairActions.createChairFailure, (state) => {
    return {
      ...state,
      ...initialState,
      loadChairsError: true,
      isLoadingChairs: false,
    };
  }),

  on(ChairActions.deleteChair, (state, {data}) => {
    return {
      ...state,
      loadChairsError: true,
      isLoadingChairs: false,
    };
  }),

  on(ChairActions.deleteChairSuccess, (state) => {
    return {
      ...state,
      loadChairsError: false,
      isLoadingChairs: false,
    };
  }),

  on(ChairActions.deleteChairFailure, (state) => {
    return {
      ...state,
      ...initialState,
      loadChairsError: true,
      isLoadingChairs: false,
    };
  }),
);

export const chairFeature = createFeature({
  name: chairFeatureKey,
  reducer,
});

