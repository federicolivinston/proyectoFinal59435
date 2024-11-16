import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { StudentDetail } from '../../../../core/models/studentModels';

export const StudentActions = createActionGroup({
  source: 'Student',
  events: {
    'Load Students': emptyProps(),
    'Load Students Success': props<{ data: StudentDetail[] }>(),
    'Load Students Failure': props<{ error: boolean }>(),
    'Create Student': props<{data: StudentDetail}>(),
    'Create Student Success': props<{ data: StudentDetail }>(),
    'Create Student Failure': props<{ error: boolean }>(),
    'Update Student': props<{ id:string, data: StudentDetail }>(),
    'Update Student Success': props<{ data: StudentDetail [] }>(),
    'Update Student Failure': props<{ error: boolean }>(),
    'Delete Student': props<{data: string}>(),
    'Delete Student Success': props<{ data: StudentDetail[] }>(),
    'Delete Student Failure': props<{ error: boolean }>(),
  }
});
