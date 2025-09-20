import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class ChatsHttpService {
  private ENV = environment;
  private baseUrl: string = `${this.ENV.apiUrl}/chats`;

  constructor(private http: HttpClient){}

  fetchChats(): Observable<any>{
    return this.http.get<any>(this.baseUrl);
  }
}
