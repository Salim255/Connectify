import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Chat } from "../model/chat.model";

export type GetChatResponse = {
  status: 'Success';
  data: {
    chat: Chat
  }
}

@Injectable({providedIn: 'root'})
export class ChatHttpService {
  private ENV = environment;
  private baseUrl: string = `${this.ENV.apiUrl}/chats`;

  constructor(private http: HttpClient){}

  fetchChatByChatId(chatId: string): Observable<GetChatResponse>{
    return this.http.get<any>(`${this.baseUrl}`, {
      params: {chatId}
    })
  }

  fetchChatByProfilesIds(
    senderProfileId: string,
    receiverProfileId: string,
  ): Observable< GetChatResponse>{
    return this.http.get<any>(`${this.baseUrl}/profiles`,{
      params: {
        senderProfileId,
        receiverProfileId,
      }
    })
  }

  createChat(data: any){
    return this.http.post<any>(this.baseUrl, {data})
  }

  sendMessage(data: any){
    return this.http.post<any>(this.baseUrl, {data})
  }
}
