import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { AccountRoutingModule } from "./account-routing.module";
import { AccountComponent } from "./account.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AccountRoutingModule,
    SharedModule
  ],
  declarations: [AccountComponent]
})
export class AccountModule {

}
