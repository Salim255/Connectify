import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class BrowseHttpService {
  private ENV = environment;
  private baseUrl: string = `${this.ENV.apiUrl}/profiles`;

  constructor(private http: HttpClient){}

  fetchProfiles():Observable<any>{
    return this.http.get<any>(this.baseUrl);
  }
}
