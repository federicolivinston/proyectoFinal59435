import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Profile, User } from '../../../../core/models/userModels';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ data: User[] }>(),
    'Load Users Failure': props<{ error: boolean }>(),
    'Create User': props<{data: User}>(),
    'Create User Success': props<{ data: User }>(),
    'Create User Failure': props<{ error: boolean }>(),
    'Update User': props<{ id:string, data: User }>(),
    'Update User Success': props<{ data: User [] }>(),
    'Update User Failure': props<{ error: boolean }>(),
    'Delete User': props<{data: string}>(),
    'Delete User Success': props<{ data: User[] }>(),
    'Delete User Failure': props<{ error: boolean }>(),
    'Load Profiles': emptyProps(),
    'Load Profiles Success': props<{ data: Profile[] }>(),
    'Load Profiles Failure': props<{ error: boolean }>(),
  }
});
