import { Injectable } from "@angular/core";
import { CanMatch, Route, UrlSegment } from "@angular/router";
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
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.userIsAuthenticated.pipe(
      take(1),
        switchMap((isAuthenticated) => {
          if (!isAuthenticated){
            return this.authService.autoLogin();
          } else {
            return of(isAuthenticated);
          }
        }
      ),
      tap((isAuthenticated) => {
        if (!isAuthenticated){
          this.router.navigateByUrl('/auth');
        }
      })
    );
  }
}
