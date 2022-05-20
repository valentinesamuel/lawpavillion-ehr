import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PatientListComponent } from './patient-list/patient-list.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { PatientEffect } from './state/patient.effect';
import { patientsReducer } from './state/patient.reducer';
import { PATIENT_STATE_NAME } from './state/patient.selector';
import { PatientHomeComponent } from './patient-home/patient-home.component';
import { HeaderComponent } from '../shared/header/header.component';
import {MatTableModule} from '@angular/material/table'


const routes: Routes = [
  {
    path: '',
    component: PatientHomeComponent,
    children: [
      { path: 'patient', component: PatientListComponent },
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
    MatTableModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(PATIENT_STATE_NAME, patientsReducer),
    EffectsModule.forFeature([PatientEffect]),
  ],
  declarations: [
    PatientListComponent,
    RegisterPatientComponent,
    PatientHomeComponent,
    HeaderComponent
  ],
})
export class PatientModule {}
