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
  displayedPatient: any = [];
  patients: any = [];
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
    this.patients.forEach((pat: any) => {
      let patientImage = new Image();
      patientImage.src = pat.image;
      const parsedImagePatient = { ...pat, image: patientImage };
     
    });
    this.store.dispatch(loadPatients());
    console.log(this.displayedPatient);
  }


  viewProfile() {
    console.log('go to profile');
  }
}
