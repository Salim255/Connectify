import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ChatRoutingModule } from "./chat-routing.module";
import { ChatComponent } from "./chat.component";
import { ChatFomComponent } from "./components/chat-form/chat-form.component";
import { MessageBubbleComponent } from "./components/message-bubble/message-bubble.component";
import { MessagesComponent } from "./components/messages/messages.component";
import { ChatHeaderComponent } from "./components/chat-header/chat-header";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ChatRoutingModule
  ],
  declarations: [
    ChatHeaderComponent,
    MessagesComponent,
    MessageBubbleComponent,
    ChatFomComponent,
    ChatComponent,
  ]
})
export class ChatModule {}
