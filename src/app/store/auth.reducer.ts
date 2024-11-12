import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { User } from '../core/models/userModels';

export const authFeatureName = 'auth';

export interface AuthState {
  authenticatedUser: User | null;
}

const initialState: AuthState = {
  authenticatedUser: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.setAuthenticatedUser, (state, action) => {
    return {
      ...state,
      authenticatedUser: action.user,
    };
  }),
  on(AuthActions.unsetAuthenticatedUser, (state) => {
    return {
      ...state,
      authenticatedUser: null,
    };
  })
);