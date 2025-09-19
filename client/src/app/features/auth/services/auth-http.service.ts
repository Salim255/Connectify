import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export type  LogInPayload = {
  email: string;
  password: string;
}
@Injectable({providedIn: 'root'})
export class AuthHttpService {
  private ENV = environment;
  private baseUrl: string = `${this.ENV.apiUrl}/users`;

  constructor(private http: HttpClient){}
  logIn(data: LogInPayload): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/login`, data);
  }
}
