import { NgModule } from "@angular/core";
import { ChatsComponent } from "./chats.component";
import { ChatsRoutingModule } from "./chats-routing.module";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ChatsRoutingModule
  ],
  declarations: [ChatsComponent]
})

export class ChatsModule {}
