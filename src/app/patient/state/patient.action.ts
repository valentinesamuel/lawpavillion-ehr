import { createAction, props } from '@ngrx/store';
import { Patient } from 'src/app/models/patient.model';

export const ADD_PATIENT_ACTION = '[patient page] add patient';
export const ADD_PATIENT_SUCCESS = '[patient page] add patient success';
export const LOAD_PATIENTS = '[patient page] load patient';
export const LOAD_PATIENTS_SUCCESS = '[patient page] load patient success';

export const addPatient = createAction(
  ADD_PATIENT_ACTION,
  props<{ patient: Patient }>()
);

export const addPatientSuccess = createAction(
  ADD_PATIENT_SUCCESS,
  props<{ patient: Patient }>()
);

export const loadPatients = createAction(LOAD_PATIENTS);

export const loadPatientsSuccess = createAction(
  LOAD_PATIENTS_SUCCESS,
  props<{ patients: Patient[] }>()
);
