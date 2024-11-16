import { createFeature, createReducer, on } from '@ngrx/store';
import { StudentActions } from './student.actions';
import { Student, StudentDetail } from '../../../../core/models/studentModels';

export const studentFeatureKey = 'student';

export interface State {
  isLoadingStudents: boolean;
  loadStudentsError: boolean;
  Students: StudentDetail[];
}

export const initialState: State = {
  isLoadingStudents:false,
  loadStudentsError:false,
  Students: [],
};

export const reducer = createReducer(
  initialState,
  on(StudentActions.loadStudents, (state) => {
    return {
      ...state,
      isLoadingStudents: true,
      loadStudentsError: false,
    };
  }),

  on(StudentActions.loadStudentsSuccess, (state, action) => {
    return {
      ...state,
      Students: action.data,
      loadStudentsError: false,
      isLoadingStudents: false,
    };
  }),

  on(StudentActions.loadStudentsFailure, (state) => {
    return {
      ...state,
      ...initialState,
      loadStudentsError: true,
      isLoadingStudents: false,
    };
  }),

  /*on(StudentActions.loadDegrees, (state) => {
    return {
      ...state,
    };
  }),

  on(StudentActions.loadDegreesSuccess, (state, action) => {
    return {
      ...state,
      Degrees: action.data,
    };
  }),

  on(StudentActions.loadDegreesFailure, (state) => {
    return {
      ...state,
      ...initialState,
    };
  }),*/

  on(StudentActions.createStudent, (state, {data}) => {
    return {
      ...state,
      loadStudentsError: true,
      isLoadingStudents: false,
    };
  }),

  on(StudentActions.createStudentSuccess, (state) => {
    return {
      ...state,
      loadStudentsError: false,
      isLoadingStudents: false,
    };
  }),
  
  on(StudentActions.createStudentFailure, (state) => {
    return {
      ...state,
      ...initialState,
      loadStudentsError: true,
      isLoadingStudents: false,
    };
  }),

  on(StudentActions.deleteStudent, (state, {data}) => {
    return {
      ...state,
      loadStudentsError: true,
      isLoadingStudents: false,
    };
  }),

  on(StudentActions.deleteStudentSuccess, (state) => {
    return {
      ...state,
      loadStudentsError: false,
      isLoadingStudents: false,
    };
  }),

  on(StudentActions.deleteStudentFailure, (state) => {
    return {
      ...state,
      ...initialState,
      loadStudentsError: true,
      isLoadingStudents: false,
    };
  }),
);

export const studentFeature = createFeature({
  name: studentFeatureKey,
  reducer,
});

