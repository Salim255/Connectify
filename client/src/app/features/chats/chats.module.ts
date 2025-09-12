import { NgModule } from "@angular/core";
import { ChatsComponent } from "./chats.component";
import { ChatsRoutingModule } from "./chats-routing.module";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { ChatItemComponent } from "./components/chat-item/chat-item.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ChatsRoutingModule,
    SharedModule
  ],
  declarations: [ChatItemComponent ,ChatsComponent]
})

export class ChatsModule {}
