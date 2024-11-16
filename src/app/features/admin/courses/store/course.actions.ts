import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Course, Degree } from '../../../../core/models/courseModels';

export const CourseActions = createActionGroup({
  source: 'Course',
  events: {
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ data: Course[] }>(),
    'Load Courses Failure': props<{ error: boolean }>(),
    'Create Course': props<{data: Course}>(),
    'Create Course Success': props<{ data: Course }>(),
    'Create Course Failure': props<{ error: boolean }>(),
    'Update Course': props<{ id:string, data: Course }>(),
    'Update Course Success': props<{ data: Course [] }>(),
    'Update Course Failure': props<{ error: boolean }>(),
    'Delete Course': props<{data: string}>(),
    'Delete Course Success': props<{ data: Course[] }>(),
    'Delete Course Failure': props<{ error: boolean }>(),
    'Load Degrees': emptyProps(),
    'Load Degrees Success': props<{ data: Degree[] }>(),
    'Load Degrees Failure': props<{ error: boolean }>(),
  }
});
