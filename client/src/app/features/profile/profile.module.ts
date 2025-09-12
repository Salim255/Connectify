import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from "./profile.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DetailItemComponent } from "./components/detail-item/detail-item.component";
import { GenderComponent } from "./components/gender/gender.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProfileRoutingModule,
    SharedModule
  ],
  declarations: [ GenderComponent, DetailItemComponent, ProfileComponent]
})
export class ProfileModule {}
