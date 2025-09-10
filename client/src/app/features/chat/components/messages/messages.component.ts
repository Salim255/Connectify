import { Component, input } from "@angular/core";
import { Message } from "../../model/message.model";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  standalone: false
})

export class MessagesComponent{
 messages = input< Message[]>();
}
