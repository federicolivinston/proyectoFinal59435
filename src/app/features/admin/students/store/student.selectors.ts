import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStudent from './student.reducer';

export const selectStudentState = createFeatureSelector<fromStudent.State>(
  fromStudent.studentFeatureKey
);

export const selectStudents = createSelector(
  selectStudentState,
  (state) => state.Students
);

export const selectLoadStudentsError = createSelector(
  selectStudentState,
  (state) => state.loadStudentsError
);

export const selectIsLoadingStudents = createSelector(
  selectStudentState,
  (state) => state.isLoadingStudents
);

/*export const selectDegrees = createSelector(
  selectStudentState,
  (state) => state.Degrees
);*/