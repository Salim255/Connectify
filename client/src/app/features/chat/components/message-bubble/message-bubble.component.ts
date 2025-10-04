import { Component, input} from "@angular/core";
import { Message } from "src/app/features/chat/model/message.model";

@Component({
  selector: 'app-message-bubble',
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.scss'],
  standalone: false,
})

export class MessageBubbleComponent {
  message = input<Message>();

  get getIconName(): string{
    switch(this.message()?.status){
      case 'sending':
        return 'time-outline';
      case 'sent':
        return 'checkmark-outline';
      case 'delivered':
        return 'checkmark-done-outline';
      case 'read':
        return 'checkmark-done-outline';
      case 'failed':
        return '';
      default:
        return ''
    }
  }
}
