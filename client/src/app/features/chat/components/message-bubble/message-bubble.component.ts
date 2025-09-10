import { Component, Input } from "@angular/core";
import { Message } from "src/app/features/messages/model/message.model";

@Component({
  selector: 'app-message-bubble',
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.scss'],
  standalone: false,
})

export class MessageBubbleComponent {
  @Input() message!: Message
}
