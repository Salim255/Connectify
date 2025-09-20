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
@Injectable({providedIn: 'root'})
export class BrowseHttpService {
  private ENV = environment;
  private baseUrl: string = `${this.ENV.apiUrl}/profiles`;

  constructor(private http: HttpClient){}

  fetchProfiles():Observable<ProfilesResponse>{
    return this.http.get<ProfilesResponse>(this.baseUrl);
  }
}
