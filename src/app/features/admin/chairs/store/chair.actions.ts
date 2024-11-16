import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Chair, ChairDetail } from '../../../../core/models/chairModels';
import { Course } from '../../../../core/models/courseModels';

export const ChairActions = createActionGroup({
  source: 'Chair',
  events: {
    'Load Chairs': emptyProps(),
    'Load Chairs Success': props<{ data: ChairDetail[] }>(),
    'Load Chairs Failure': props<{ error: boolean }>(),
    'Load Chairs Courses': emptyProps(),
    'Load Chairs Courses Success': props<{ data: Course[] }>(),
    'Load Chairs Courses Failure': props<{ error: boolean }>(),
    'Create Chair': props<{data: Chair}>(),
    'Create Chair Success': props<{ data: Chair }>(),
    'Create Chair Failure': props<{ error: boolean }>(),
    'Update Chair': props<{ id:string, data: Chair }>(),
    'Update Chair Success': props<{ data: Chair [] }>(),
    'Update Chair Failure': props<{ error: boolean }>(),
    'Delete Chair': props<{data: string}>(),
    'Delete Chair Success': props<{ data: Chair[] }>(),
    'Delete Chair Failure': props<{ error: boolean }>(),
    
  }
});
