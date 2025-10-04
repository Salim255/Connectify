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
    return "checkmark";
  }
}
