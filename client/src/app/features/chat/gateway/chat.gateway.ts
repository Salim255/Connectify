import { Injectable, OnInit } from "@angular/core";

@Injectable({providedIn: 'root'})

export class ChatGatewayService {
  constructor(){}

  initializeChatGateway(){
    console.log('Hello from Chat gateway')
  }
}
