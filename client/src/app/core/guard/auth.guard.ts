import { Injectable } from "@angular/core";
import { CanMatch, Route, UrlSegment } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/features/auth/services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanMatch {
  constructor(private authService:  AuthService){}
  canMatch(
    route: Route, segments: UrlSegment[],
  ): Observable<boolean> | Promise<boolean> | boolean {
   return  this.authService.isAuthenticated;
  }
}
