import { Component } from "@angular/core";
import { ChatService } from "./services/chat.service";
import { Message } from "./model/message.model";
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: false
})
export class ChatComponent{
  messages: Message [];
  constructor(private chatService: ChatService){
    this.messages =  this.chatService.placeholderMessages;
  }

}
