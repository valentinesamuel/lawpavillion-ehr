import { Action, createReducer, on } from '@ngrx/store';
import {
  addPatient,
  addPatientSuccess,
  loadPatientsSuccess,
} from './patient.action';
import { initialState, PatientsState } from './patient.state';

const _patientsReducer = createReducer(
  initialState,
  on(addPatientSuccess, (state, action) => {
    let patient = { ...action.patient };
    return {
      ...state,
      patients: [...state.patients, patient],
    };
  }),

  on(addPatient, (state, action) => {
    let patient = { ...action.patient };
    patient.id = (state.patients.length + 1).toString();
    return {
      ...state,
      patients: [...state.patients, patient],
    };
  }),
  on(loadPatientsSuccess, (state, action) => {
    return {
      ...state,
      patients: action.patients,
    };
  })
);

export function patientsReducer(state: PatientsState, action: Action) {
  return _patientsReducer(state, action);
}
