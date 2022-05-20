import { Patient } from 'src/app/models/patient.model';

export interface PatientsState {
  patients: Patient[];
}

export const initialState: PatientsState = {
  patients: [
    // {
    //   id: '3',
    //   name: 'Ralph Edwards',
    //   gender: 'Male',
    //   age: 45,
    //   phoneNumber: '+234(0)813409858',
    //   address: '19, Mbari Shopping Plaza, Ikenegbu.Owerri Municipal',
    //   image: 'jerome.svg',
    // },
  ],
};
