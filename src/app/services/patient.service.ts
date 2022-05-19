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
          //   const patient: Patient[] = [];
          //   for (let key in data) {
          //     posts.push({ ...data[key], id: key });
          //   }
          console.log(patients);

          return patients;
        })
      );
  }

  addPost(patient:Patient): Observable<{ patient: Patient }> {
    return this.http.post<{ patient: Patient }>(
      `https://lawpavillion-patient-api.herokuapp.com/patients`,
      patient
    );
  }
}
