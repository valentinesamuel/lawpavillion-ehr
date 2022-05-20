import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { autoLogout } from 'src/app/auth/state/auth.action';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-patient-home',
  templateUrl: './patient-home.component.html',
  styleUrls: ['./patient-home.component.scss'],
})
export class PatientHomeComponent implements OnInit {
  constructor(private store:Store<AppState>) {}

  ngOnInit(): void {}
  onLogout(event: Event) {
    event.preventDefault();
    this.store.dispatch(autoLogout());
  }
}
