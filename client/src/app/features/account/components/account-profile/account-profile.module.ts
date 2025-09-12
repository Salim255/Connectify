import { NgModule } from "@angular/core";
import { AccountProfileComponent } from "./account-profile.component";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
  ],
  declarations: [AccountProfileComponent]
})

export class AccountProfileModule{}
