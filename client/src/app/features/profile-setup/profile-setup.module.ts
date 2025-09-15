import { NgModule } from "@angular/core";
import { ProfileSetupComponent } from "./profile-setup.component";
import { ProfileSetupRoutingModule } from "./profile-setup-routing.module";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [ProfileSetupComponent],
  imports: [
    IonicModule,
    FormsModule,
    ProfileSetupRoutingModule,
  ],
})
export class ProfileSetupModule {}
