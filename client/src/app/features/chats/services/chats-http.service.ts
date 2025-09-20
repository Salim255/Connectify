import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class ChatsHttpService {
  private ENV = environment;
  private baseUrl: string = `${this.ENV.apiUrl}/chats`;

  constructor(private http: HttpClient){}
}
