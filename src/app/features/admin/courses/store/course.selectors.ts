import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourse from './course.reducer';

export const selectCourseState = createFeatureSelector<fromCourse.State>(
  fromCourse.courseFeatureKey
);

export const selectCourses = createSelector(
  selectCourseState,
  (state) => state.Courses
);

export const selectLoadCoursesError = createSelector(
  selectCourseState,
  (state) => state.loadCoursesError
);

export const selectIsLoadingCourses = createSelector(
  selectCourseState,
  (state) => state.isLoadingCourses
);

export const selectDegrees = createSelector(
  selectCourseState,
  (state) => state.Degrees
);