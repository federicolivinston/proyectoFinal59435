import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureName, AuthState } from './auth.reducer';

export const selectAuthState =
  createFeatureSelector<AuthState>(authFeatureName);

export const selectAutheticatedUser = createSelector(
  selectAuthState,
  (state) => state.authenticatedUser
);

export const selectUserProfile = createSelector(
  selectAuthState,
  (state) => state.authenticatedUser?.profile || ''
);