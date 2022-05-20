import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { AppState } from "src/app/store/app.state";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/shared-store/shared.action";
import { autoLogin, autoLogout, loginStart, loginSuccess } from "./auth.action";

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            return loginSuccess({ user, redirect: true });
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));

            const errorMessagge = this.authService.getErrorMessage(
              errResp.error.error.message
            );

            return of(setErrorMessage({ message: errorMessagge }));
          })
        );
      })
    );
  });

  logindirect$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(loginSuccess),
        tap((action) => {
          this.store.dispatch(setErrorMessage({ message: '' }));
          if (action.redirect) {
            this.router.navigate(['/patients/patient']);
          }
        })
      );
    },
    { dispatch: false }
  );

  //   signUpRedirect$ = createEffect(
  //     () => {
  //       return this.action$.pipe(
  //         ofType(signUpSuccess),
  //         tap((action) => {
  //           this.store.dispatch(setErrorMessage({ message: '' }));
  //           this.router.navigate(['/']);
  //         })
  //       );
  //     },
  //     { dispatch: false }
  //   );

  //   signUp$ = createEffect(() => {
  //     return this.action$.pipe(
  //       ofType(signUpStart),
  //       exhaustMap((action) => {
  //         return this.authService.signUp(action.email, action.password).pipe(
  //           map((data) => {
  //             this.store.dispatch(setLoadingSpinner({ status: false }));
  //             const user = this.authService.formatUser(data);
  //             this.authService.setUserInLocalStorage(user);

  //             return signUpSuccess({ user, redirect: true });
  //           }),
  //           catchError((errResp) => {
  //             this.store.dispatch(setLoadingSpinner({ status: false }));
  //             const errorMessagge = this.authService.getErrorMessage(
  //               errResp.error.error.message
  //             );
  //             return of(setErrorMessage({ message: errorMessagge }));
  //           })
  //         );
  //       })
  //     );
  //   });

  autoLogin$ = createEffect((): any => {
    return this.action$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        const user = this.authService.getUserFromLocalStorage();
        return of(loginSuccess({ user, redirect: false }));
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(autoLogout),
        map((action) => {
          this.authService.logout();
          this.router.navigate(['']);
        })
      );
    },
    { dispatch: false }
  );
}