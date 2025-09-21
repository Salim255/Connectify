import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class ChatHttpService {
  private ENV = environment;
  private baseUrl: string = `${this.ENV.apiUrl}/chats`;

  constructor(private http: HttpClient){}

  fetchChatByChatId(chatId: string): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}`, {
      params: {chatId}
    })
  }

  fetchChatByUsersIds(participantId: string): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/users`,{
      params: { participantId }
    })
  }
}
