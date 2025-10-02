import { Component, signal } from "@angular/core";
import { ChatService } from "../../services/chat.service";
import { NgForm } from "@angular/forms";
import { ChatGatewayService, TypingPayload } from "../../gateway/chat.gateway";

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss'],
  standalone: false,
})


export class ChatFomComponent {
  textMessage: string = '';
  private isTypingDebounced:  boolean = false;
  private typingTimeout = 2000;
  private typingTimer: ReturnType<typeof setTimeout> | null = null; // Timer for "stop typing"

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
    const chatId: string | null = this.chatService.getActiveChat.id;
    if (!event || !chatId) return

    // Debouncing: Emit "typing" only once until the user stops typing
    if(!this.isTypingDebounced) {
      this.chatGatewayService.notifyTyping({roomId: chatId, typing: true});
    }


    // Clear the timer on each input event and set a new one
    if (this.typingTimer) {
      clearTimeout(this.typingTimer);
    }

     // Start a timer to trigger "stop typing" after inactivity
    this.typingTimer = setTimeout(() => {
      this.stopTyping({roomId: chatId, typing:false });
    }, this.typingTimeout);
  }

  stopTyping(payload: TypingPayload): void {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
      this.typingTimer = null;
    }

    this.isTypingDebounced = false;
    this.chatGatewayService.notifyTyping(payload);
  }
}
