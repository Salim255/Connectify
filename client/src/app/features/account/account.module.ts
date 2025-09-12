import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { AccountRoutingModule } from "./account-routing.module";
import { AccountComponent } from "./account.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AccountNavComponent } from "./components/account-nav/account-nav.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AccountRoutingModule,
    SharedModule
  ],
  declarations: [ AccountNavComponent, AccountComponent]
})
export class AccountModule {

}
