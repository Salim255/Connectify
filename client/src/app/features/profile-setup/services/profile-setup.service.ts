import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Profile, ProfileGender } from "../../profile/model/profile.model";
import { Observable, tap } from "rxjs";
import { ProfileService } from "../../profile/services/profile.service";
import { Router } from "@angular/router";

export type CreateProfilePayload = {
  name: string;
  age: Date;
  gender: ProfileGender;
  avatarUrl: string;
}

export type CreateProfileResponse = {
  status: 'Success',
  data: {
    profile: Profile
  }
}

@Injectable({providedIn: 'root'})
export class ProfileSetupService {
  private ENV = environment;
  private baseUrl: string = `${this.ENV.apiUrl}/profiles`;

  constructor(
    private profileService: ProfileService,
    private http: HttpClient,
    private router: Router,
  ){}

  createProfile(profilePayload: CreateProfilePayload ): Observable<CreateProfileResponse>{
    return this.http.post<CreateProfileResponse>(this.baseUrl, profilePayload).pipe(
      tap((response) => {
        console.log(response);
        const profile = response.data.profile;
        if(profile.id) {
          this.profileService.setProfile(profile);
          this.router.navigate(['/browse']);
        }
      })
    )
  }
}
