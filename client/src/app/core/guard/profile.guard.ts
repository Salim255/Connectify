import { Injectable } from "@angular/core";
import { CanActivate, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { ProfileService } from "src/app/features/profile/services/profile.service";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class ProfileGuard implements CanActivate {

  constructor(
    private router: Router,
    private profileService: ProfileService,
  ){}

  canActivate(): Observable<boolean | UrlTree> {
    return this.profileService.getProfile$.pipe(
      take(1),
      map((profile) => {
        if(!profile){
          return this.router.parseUrl('/profile-setup');
        }
        return true;
      })
    );
  }
}
