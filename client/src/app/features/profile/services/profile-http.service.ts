import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Profile } from "../model/profile.model";

export type ProfileResponse = {
  status: string;
  data: {
    profile: Profile;
  }
}

@Injectable({providedIn: 'root'})
export class ProfileHttpService {
  private ENV = environment;
  private baseUrl:string = `${this.ENV.apiUrl}/profiles`;
  constructor(private http: HttpClient){}

  fetchProfile():Observable<ProfileResponse>{
    return this.http.get<ProfileResponse>(`${this.baseUrl}/users`);
  }
}
