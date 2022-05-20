import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.scss'],
})
export class RegisterPatientComponent implements OnInit {
  step = 1;
  selected:any
  constructor() {}

  ngOnInit(): void { }
  selectStep(step: any) {
    this.step = step
    this.selected = !this.selected
  }
}
