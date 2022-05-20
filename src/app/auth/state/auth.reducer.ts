import { Action, createReducer, on } from "@ngrx/store";
import { autoLogout, loginSuccess } from "./auth.action";
import { AuthState, initialState } from "./auth.state";

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
//   on(signUpSuccess, (state, action) => {
//     return {
//       ...state,
//       user: action.user,
//     };
//   }),
  on(autoLogout, (state, action) => {
    return {
      ...state,
      user: null,
    };
  })
);

export function AuthReducer(state: AuthState, action: Action) {
  return _authReducer(state, action);
}
