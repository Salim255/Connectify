import { NgModule } from "@angular/core";
import { AccountProfileComponent } from "./account-profile.component";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { AccountProfileRoutingModule } from "./account-profile-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    AccountProfileRoutingModule,
    SharedModule
],
  declarations: [AccountProfileComponent]
})

export class AccountProfileModule{}
