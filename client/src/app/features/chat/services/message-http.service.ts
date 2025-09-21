import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export type MessagePostPayload = {
  content: string;
  chatId: string;
  senderId: string;
}
@Injectable({providedIn: 'root'})
export class MessageHttpService {
  private ENV = environment;
  private baseUrl: string = `${this.ENV.apiUrl}/messages`;

  constructor(private http: HttpClient){}

  createMessage(payload: MessagePostPayload): Observable<any>{
    return this.http.post<any>(this.baseUrl, payload)
  }
}
