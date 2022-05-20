import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { addPatient } from '../state/patient.action';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.scss'],
})
export class RegisterPatientComponent implements OnInit {
  completed = false
  file: any;
  imageUrl: '';
  step = 1;
  selected: any;
  titles = ['Mr', 'Mrs', 'Master', 'Miss'];
  genders = ['Gender', 'Male', 'Female', 'Other'];
  ethnicities = ['igbo', 'yoruba', 'hausa', 'german', 'british', 'american'];
  religion = ['christainity', 'muslim', 'hinduism', ' stoicism', 'budduhism'];
  maritalStatus = ['single', 'married', 'engaged'];
  nationality = ['nigeia', 'america', 'united kingdom', 'israel', 'canada'];
  stateOfOrigin = ['alabama', 'lagos', 'abuja', 'manchester', 'rivers'];
  localGovernment = [
    'ijebu-ode',
    'ikoba-okha',
    'oredo',
    'uvwie',
    'obio-akpor',
    'khana',
    'okpe',
  ];
  stateofResidence = ['alabama', 'lagos', 'abuja', 'manchester', 'rivers'];
  relationship = ['mother', 'father', 'brother', 'sister'];
  sponsorBillingPolicy = ['tied', 'owed', 'omo', 'e choke'];

  PatientData: FormGroup;
  constructor(private store:Store<AppState>) {}

  ngOnInit(): void {
    this.PatientData = new FormGroup({
      address: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
    });
  }


  getFile(event: any) {
    this.file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      this.PatientData.value.image = event.target.result;
    };
  }

  changeGender(event: any) {
    this.PatientData.value.gender = event.target.value;
  }

  onRegisterPatient() {
    // to register
    console.log('re');
    if (this.step > 4) {
     const unparsedPatientData = this.PatientData.value;
     const userAge = Math.floor(Math.random() * (150 + 1));
     const patient = {
       ...unparsedPatientData,
       name: unparsedPatientData.firstName + ' ' + unparsedPatientData.surname,
       age: userAge,
       image:this.imageUrl
     };
      this.step= 4
      console.log(patient);
      this.store.dispatch(addPatient({patient}))
   }
 
  }
  continue() {
   if (this.step < 5 || this.step === 1) {
     this.step = this.step + 1;
   } else if (this.step > 4) {
  
     console.log('registered');
   }
   console.log(this.step);
}
  goBack() {
    
    if (this.step > 1 ) {
      this.step = this.step - 1;
    }
  }
}
