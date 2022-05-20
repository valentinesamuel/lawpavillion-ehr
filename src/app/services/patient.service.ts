import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Patient } from '../models/patient.model';


@Injectable({ providedIn: 'root' })
export class PatientService {
  constructor(private http: HttpClient) {}

  getPatients(): Observable<Patient[]> {
    return this.http
      .get<Patient[]>(`https://lawpavillion-patient-api.herokuapp.com/patients`)
      .pipe(
        map((patients) => {
          return patients;
        })
      );
  }

  addPatient(patient: Patient): Observable<{ patient: Patient }> {
    // const patient ={}
    return this.http.post<{ patient: Patient }>(
      `https://lawpavillion-patient-api.herokuapp.com/patients`,
      patient
    );
  }
}
