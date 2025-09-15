import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class AuthHttpService {
  private ENV = environment;
  //private API_URL = this.ENV.apiUrl;
  // This service will handle HTTP requests related to authentication
}
