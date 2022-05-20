import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { PatientService } from "src/app/services/patient.service";
import { addPatient, addPatientSuccess, loadPatients, loadPatientsSuccess } from "./patient.action";

@Injectable()
export class PatientEffect {
  constructor(private action$: Actions, private patientService: PatientService) {}

  loadPatients$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loadPatients),
      mergeMap((action) => {
        return this.patientService.getPatients().pipe(
          map((patients) => {          
            return loadPatientsSuccess({ patients });
          })
        );
      })
    );
  });

  addPatient$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(addPatient),
        mergeMap((action) => {
          return this.patientService.addPost(action.patient).pipe(
            map((data) => {
            const patient = { ...action.patient, id: data.patient.id };
              return addPatientSuccess({ patient });
            })
          );
        })
      );
    },
    { dispatch: false }
  );
}
