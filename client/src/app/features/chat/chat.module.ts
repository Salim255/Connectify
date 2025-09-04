import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ChatRoutingModule } from "./chat-routing.module";
import { ChatComponent } from "./chat.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ChatRoutingModule
  ],
  declarations: [ChatComponent]
})
export class ChatModule {}
