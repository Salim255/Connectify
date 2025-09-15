import { Injectable } from "@angular/core";
import { CanMatch, Route, UrlSegment, UrlTree } from "@angular/router";
import { map, Observable, of, switchMap, take, tap } from "rxjs";
import { AuthService } from "src/app/features/auth/services/auth.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanMatch {
  constructor(
    private router: Router,
    private authService:  AuthService){}

  canMatch(
    route: Route, segments: UrlSegment[],
  ): Observable<boolean | UrlTree>{
    console.log('AuthGuard#canMatch called');
    return this.authService.userIsAuthenticated.pipe(
      take(1),

        switchMap((isAuthenticated) => {
          console.log('isAuthenticated', isAuthenticated);
          if (isAuthenticated){
            return of(true);
          }

          return this.authService.autoLogin().pipe(
            map((authenticated) => {
              if (authenticated){
                return true;
              } else {
                // Angular-friendly redirect;
                const urlTree = this.router.parseUrl('/auth');
                return urlTree;
              }

            })
          );
        }
      )
    );
  }
}
