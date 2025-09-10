import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ChatRoutingModule } from "./chat-routing.module";
import { ChatComponent } from "./chat.component";
import { ChatFomComponent } from "./components/chat-form/chat-form.component";
import { MessageBubbleComponent } from "./components/message-bubble/message-bubble.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ChatRoutingModule
  ],
  declarations: [MessageBubbleComponent ,ChatFomComponent, ChatComponent]
})
export class ChatModule {}
