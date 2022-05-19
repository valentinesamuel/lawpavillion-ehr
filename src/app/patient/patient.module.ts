import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PatientListComponent } from './patient-list/patient-list.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { PatientEffect } from './state/patient.effect';
import { patientsReducer } from './state/patient.reducer';
import { PATIENT_STATE_NAME } from './state/patient.selector';

const routes: Routes = [
  {
    path: '',
    component: PatientListComponent,
    children: [
      {
        path: 'add',
        component: RegisterPatientComponent,
      },
    ],
  },
];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(PATIENT_STATE_NAME, patientsReducer),
    EffectsModule.forFeature([PatientEffect]),
  ],
  declarations: [PatientListComponent, RegisterPatientComponent],
})
export class PatientModule {}
