import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PatientsState } from './patient.state';

export const PATIENT_STATE_NAME = 'patients';
const getPatientsState =
  createFeatureSelector<PatientsState>(PATIENT_STATE_NAME);

export const getPatients = createSelector(getPatientsState, (state) => {
  return state.patients;
});
