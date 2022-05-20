import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { autoLogout } from '../auth/state/auth.action';
import { AuthResponseData } from '../models/auth-response.model';
import { User } from '../models/user.model';
import { AppState } from '../store/app.state';

@Injectable({ providedIn: 'root' })
export class AuthService {
  timeoutInterval: any;
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env['FIREBASE_API_KEY']}`,
      { email, password, returnSecureToken: true }
    );
  }

    // signUp(email: string, password: string): Observable<AuthResponseData> {
    //   return this.http.post<AuthResponseData>(
    //     `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`,
    //     { email, password, returnSecureToken: true }
    //   );
    // }

  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    const user = new User(
      data.email,
      data.idToken,
      data.localId,
      expirationDate
    );
    return user;
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Rmail Not Found';
      case 'INVALID_PASSWORD':
        return 'Invalid Password';
      case 'EMAIL_EXISTS':
        return 'Email Already exists';
      case 'WEAK_PASSWORD':
        return 'Password should be at least 6 characters';
      default:
        return 'Error Occured';
    }
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
    this.runTimeoutInterval(user);
  }

  runTimeoutInterval(user: User) {
    const todayDate = new Date().getTime();
    const expirationDate = user.dateOfExpiration.getTime();
    const timeInterval = expirationDate - todayDate;
    this.timeoutInterval = setTimeout(() => {
      this.store.dispatch(autoLogout());
    }, timeInterval);
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expirationDate);
      const user = new User(
        userData.email,
        userData.token,
        userData.localId,
        expirationDate
      );
      this.runTimeoutInterval(user);
      return user;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('userData');
    if ((this, this.timeoutInterval)) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }
}
