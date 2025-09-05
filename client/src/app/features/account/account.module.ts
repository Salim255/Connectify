import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { AccountRoutingModule } from "./account-routing.module";
import { AccountComponent } from "./account.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AccountRoutingModule
  ],
  declarations: [AccountComponent]
})
export class AccountModule {

}
