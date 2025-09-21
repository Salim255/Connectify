import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export type AuthResponse = {
  status: string;
  token: string;
  expireIn: number;
  data: {
    user : {
      email: string;
      id: string;
      isActive: boolean;
      isEmailVerified: boolean;
      role: string;
    }
  }
}

export type  LoginPayload = {
  email: string;
  password: string;
}

export type SignupPayload = LoginPayload & {
  passwordConfirm: string;
}

@Injectable({providedIn: 'root'})
export class AuthHttpService {
  private ENV = environment;
  private baseUrl: string = `${this.ENV.apiUrl}/users`;

  constructor(private http: HttpClient){}

  logIn(data: LoginPayload): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, data);
  }

  signup(data: SignupPayload): Observable<AuthResponse>{
    console.log(data)
    return this.http.post<AuthResponse>(`${this.baseUrl}/signup`, data);
  }
}
