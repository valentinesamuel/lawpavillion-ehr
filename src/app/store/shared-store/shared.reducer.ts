import { Action, createReducer, on } from '@ngrx/store';
import { setErrorMessage, setLoadingSpinner } from './shared.action';
import { initialState, SharedState } from './shared.state';

const _sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) => {
    return {
      ...state,
      showLoading: action.status,
    };
  }),
  on(setErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessagge: action.message,
    };
  })
);

export function SharedReducer(state: SharedState, action: Action) {
  return _sharedReducer(state, action);
}
