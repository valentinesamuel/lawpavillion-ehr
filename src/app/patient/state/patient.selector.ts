import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PatientsState } from "./patient.state";

export const PATIENT_STATE_NAME = 'patients';
const getPostsState = createFeatureSelector<PatientsState>(PATIENT_STATE_NAME);

export const getPosts = createSelector(getPostsState, (state) => {
  return state.patients;
});
