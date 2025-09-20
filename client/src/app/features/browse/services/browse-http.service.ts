import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Profile } from "../../profile/model/profile.model";

export type ProfilesResponse = {
  status: 'Success';
  data: {
    profiles: Profile []
  }
}
@Injectable({providedIn: 'root'})
export class BrowseHttpService {
  private ENV = environment;
  private baseUrl: string = `${this.ENV.apiUrl}/profiles`;

  constructor(private http: HttpClient){}

  fetchProfiles():Observable<any>{
    return this.http.get<any>(this.baseUrl);
  }
}
