import { createFeature, createReducer, on } from '@ngrx/store';
import { CourseActions } from './course.actions';
import { Course, Degree } from '../../../../core/models/courseModels';

export const courseFeatureKey = 'course';

export interface State {
  isLoadingCourses: boolean;
  loadCoursesError: boolean;
  Courses: Course[];
  Degrees: Degree[];
}

export const initialState: State = {
  isLoadingCourses:false,
  loadCoursesError:false,
  Courses: [],
  Degrees: [],
};

export const reducer = createReducer(
  initialState,

  on(CourseActions.loadCourses, (state) => {
    return {
      ...state,
      isLoadingCourses: true,
      loadCoursesError: false,
    };
  }),

  on(CourseActions.loadCoursesSuccess, (state, action) => {
    return {
      ...state,
      Courses: action.data,
      loadCoursesError: false,
      isLoadingCourses: false,
    };
  }),

  on(CourseActions.loadCoursesFailure, (state) => {
    return {
      ...state,
      ...initialState,
      loadCoursesError: true,
      isLoadingCourses: false,
    };
  }),

  on(CourseActions.loadDegrees, (state) => {
    return {
      ...state,
    };
  }),

  on(CourseActions.loadDegreesSuccess, (state, action) => {
    return {
      ...state,
      Degrees: action.data,
    };
  }),

  on(CourseActions.loadDegreesFailure, (state) => {
    return {
      ...state,
      ...initialState,
    };
  }),

  on(CourseActions.createCourse, (state, {data}) => {
    return {
      ...state,
      loadCoursesError: true,
      isLoadingCourses: false,
    };
  }),

  on(CourseActions.createCourseSuccess, (state) => {
    return {
      ...state,
      loadCoursesError: false,
      isLoadingCourses: false,
    };
  }),
  
  on(CourseActions.createCourseFailure, (state) => {
    return {
      ...state,
      ...initialState,
      loadCoursesError: true,
      isLoadingCourses: false,
    };
  }),

  on(CourseActions.deleteCourse, (state, {data}) => {
    return {
      ...state,
      loadCoursesError: true,
      isLoadingCourses: false,
    };
  }),

  on(CourseActions.deleteCourseSuccess, (state) => {
    return {
      ...state,
      loadCoursesError: false,
      isLoadingCourses: false,
    };
  }),

  on(CourseActions.deleteCourseFailure, (state) => {
    return {
      ...state,
      ...initialState,
      loadCoursesError: true,
      isLoadingCourses: false,
    };
  }),
);

export const courseFeature = createFeature({
  name: courseFeatureKey,
  reducer,
});

