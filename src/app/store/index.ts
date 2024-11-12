import { ActionReducerMap } from '@ngrx/store';
import { authFeatureName, authReducer, AuthState } from './auth.reducer';


interface RootState {
  [authFeatureName]: AuthState;
}

const RootReducer: ActionReducerMap<RootState> = {
  [authFeatureName]: authReducer,
};

export { RootReducer };