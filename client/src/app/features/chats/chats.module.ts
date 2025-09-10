import { NgModule } from "@angular/core";
import { ChatsComponent } from "./chats.component";
import { ChatsRoutingModule } from "./chats-routing.module";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { ChatItemComponent } from "./components/chat-item/chat-item.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ChatsRoutingModule
  ],
  declarations: [ChatItemComponent ,ChatsComponent]
})

export class ChatsModule {}
