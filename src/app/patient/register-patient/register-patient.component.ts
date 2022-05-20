import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.scss'],
})
export class RegisterPatientComponent implements OnInit {
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

  addPatientForm:FormGroup

  constructor() {}

  ngOnInit(): void {


  }
  selectStep(step: any) {
    this.step = step;
    this.selected = !this.selected;
  }
}
