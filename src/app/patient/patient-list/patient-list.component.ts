import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/models/patient.model';
import { AppState } from 'src/app/store/app.state';
import { loadPatients } from '../state/patient.action';
import { getPatients } from '../state/patient.selector';



@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent implements OnInit {
  patients: Observable<Patient[]> | Patient[] = [
   
  ];
  displayedColumns: string[] = [
    'image',
    'name',
    'gender',
    'age',
    'number',
    'address',
    'btn',
  ];
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.patients = this.store.select(getPatients);
    this.store.dispatch(loadPatients());
  }

  viewProfile(){
console.log('go to profile');

  }
}
