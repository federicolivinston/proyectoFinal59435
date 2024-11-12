import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { Profile, User } from '../../../../core/models/userModels';

export const userFeatureKey = 'user';

export interface State {
  isLoadingUsers: boolean;
  loadUsersError: boolean;
  users: User[];
  profiles:Profile[];
}

export const initialState: State = {
  isLoadingUsers:false,
  loadUsersError:false,
  users: [],
  profiles: [],
};

export const reducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => {
    return {
      ...state,
      isLoadingUsers: true,
      loadUsersError: false,
    };
  }),

  on(UserActions.loadUsersSuccess, (state, action) => {
    return {
      ...state,
      users: action.data,
      loadUsersError: false,
      isLoadingUsers: false,
    };
  }),

  on(UserActions.loadUsersFailure, (state) => {
    return {
      ...state,
      ...initialState,
      loadUsersError: true,
      isLoadingUsers: false,
    };
  }),

  on(UserActions.createUser, (state, {data}) => {
    return {
      ...state,
      loadUsersError: true,
      isLoadingUsers: false,
    };
  }),

  on(UserActions.createUserSuccess, (state) => {
    return {
      ...state,
      loadUsersError: false,
      isLoadingUsers: false,
    };
  }),
  
  on(UserActions.createUserFailure, (state) => {
    return {
      ...state,
      ...initialState,
      loadUsersError: true,
      isLoadingUsers: false,
    };
  }),

  on(UserActions.deleteUser, (state, {data}) => {
    return {
      ...state,
      loadUsersError: true,
      isLoadingUsers: false,
    };
  }),

  on(UserActions.deleteUserSuccess, (state) => {
    return {
      ...state,
      loadUsersError: false,
      isLoadingUsers: false,
    };
  }),

  on(UserActions.deleteUserFailure, (state) => {
    return {
      ...state,
      ...initialState,
      loadUsersError: true,
      isLoadingUsers: false,
    };
  }),

  on(UserActions.loadProfiles, (state) => {
    return {
      ...state,
      isLoadingUsers: true,
      loadUsersError: false,
    };
  }),

  on(UserActions.loadProfilesSuccess, (state, action) => {
    return {
      ...state,
      profiles: action.data,
      loadUsersError: false,
      isLoadingUsers: false,
    };
}),

on(UserActions.loadProfilesFailure, (state) => {
  return {
    ...state,
    ...initialState,
    loadUsersError: true,
    isLoadingUsers: false,
  };
}),
);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});

