import { Component } from "@angular/core";
import { ChatService } from "../../services/chat.service";
import { NgForm } from "@angular/forms";
import { ChatGatewayService } from "../../gateway/chat.gateway";

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss'],
  standalone: false,
})


export class ChatFomComponent {
  textMessage: string = '';

  constructor(
    private chatGatewayService : ChatGatewayService,
    private chatService: ChatService,
  ){}

  onSubmit(form: NgForm): void {

    if(!this.textMessage.trim().length || !form.valid ) return;

    this.chatService.sendMessage(this.textMessage).subscribe({
      next: (res) => {
        console.log(res);
       // this.chatGatewayService.
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onChange(event: string): void{
    console.log(event);
  }
}
