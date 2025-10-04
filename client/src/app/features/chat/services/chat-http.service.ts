import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Chat } from "../model/chat.model";


export type CreateChatPayload = {
  content: string;
  receiverProfileId: string;
  senderProfileId: string;
}

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
    return this.http.get<GetChatResponse>(`${this.baseUrl}/${chatId}`)
  }

  fetchChatByProfilesIds(
    senderProfileId: string,
    receiverProfileId: string,
  ): Observable<GetChatResponse>{
    return this.http.get<GetChatResponse>(`${this.baseUrl}/profiles`,{
      params: {
        senderProfileId,
        receiverProfileId,
      }
    })
  }

  createChat(data: CreateChatPayload): Observable<GetChatResponse>{
    return this.http.post<GetChatResponse>(`${this.baseUrl}/chat-with-message`, data)
  }
}
