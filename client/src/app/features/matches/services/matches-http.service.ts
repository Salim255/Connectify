import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})

export class MatchesHttpService {
  private ENV = environment;
  private baseUrl: string = `${this.ENV.apiUrl}/matches`;

  constructor(private http: HttpClient){}

  fetchMatches():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/users`);
  }
}
