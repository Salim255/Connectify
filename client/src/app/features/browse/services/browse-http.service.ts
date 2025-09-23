import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { BrowseProfile } from "../model/browse.model";

export type ProfilesResponse = {
  status: 'Success';
  data: {
    profiles: BrowseProfile []
  }
}

export type InitiateMatchDto = {
  toUserId: string;
}

@Injectable({providedIn: 'root'})
export class BrowseHttpService {
  private ENV = environment;
  private baseUrl: string = `${this.ENV.apiUrl}`;

  constructor(private http: HttpClient){}

  fetchProfiles():Observable<ProfilesResponse>{
    return this.http.get<ProfilesResponse>(`${this.baseUrl}/profiles`);
  }

  createMatch(matchPayload: InitiateMatchDto){
    return this.http.post<any>(`${this.baseUrl}/matches`, matchPayload)
  }
}
