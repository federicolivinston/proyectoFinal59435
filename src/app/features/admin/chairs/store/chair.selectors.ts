import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromChair from './chair.reducer';

export const selectChairState = createFeatureSelector<fromChair.State>(
  fromChair.chairFeatureKey
);

export const selectChairs = createSelector(
  selectChairState,
  (state) => state.Chairs
);

export const selectLoadChairsError = createSelector(
  selectChairState,
  (state) => state.loadChairsError
);

export const selectIsLoadingChairs = createSelector(
  selectChairState,
  (state) => state.isLoadingChairs
);

export const selectChairCourses = createSelector(
  selectChairState,
  (state) => state.ChairsCourses
);