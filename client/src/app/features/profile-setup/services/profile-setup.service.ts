import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ProfileGender } from "../../profile/model/profile.model";

export type CreateProfilePayload = {
  userId: string;
  name: string;
  age: Date;
  gender: ProfileGender;
  avatarUrl: string;
}

@Injectable({providedIn: 'root'})
export class ProfileSetupService {
  private ENV = environment;
  private baseUrl: string = `${this.ENV.apiUrl}/profiles`;

  constructor(private http: HttpClient){}

  createProfile(profilePayload: CreateProfilePayload ){
    return this.http.post<any>(this.baseUrl, profilePayload)
  }
}
