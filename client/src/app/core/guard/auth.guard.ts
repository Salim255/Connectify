import { Injectable } from "@angular/core";
import { CanMatch, Route, UrlSegment } from "@angular/router";
import { Observable } from "rxjs";
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
    console.log(this.authService.isAuthenticated, 'auth guard');
    const  auth =  this.authService.isAuthenticated;
   if (auth){
    return true;
   } else {
    this.router.navigateByUrl('/auth');
    return false;
   }
  }
}
