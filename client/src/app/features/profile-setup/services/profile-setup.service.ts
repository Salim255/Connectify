import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Profile, ProfileGender } from "../../profile/model/profile.model";
import { Observable } from "rxjs";

export type CreateProfilePayload = {
  userId: string;
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

  constructor(private http: HttpClient){}

  createProfile(profilePayload: CreateProfilePayload ): Observable<CreateProfileResponse>{
    return this.http.post<CreateProfileResponse>(this.baseUrl, profilePayload)
  }
}
