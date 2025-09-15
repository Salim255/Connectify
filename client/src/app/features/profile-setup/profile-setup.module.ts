import { NgModule } from "@angular/core";
import { ProfileSetupComponent } from "./profile-setup.component";
import { ProfileSetupRoutingModule } from "./profile-setup-routing.module";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { ProfileSetupFormComponent } from "./components/profile-setup-form/profile-setup-form.component";

@NgModule({
  declarations: [ProfileSetupFormComponent, ProfileSetupComponent],
  imports: [
    IonicModule,
    FormsModule,
    ProfileSetupRoutingModule,
  ],
})
export class ProfileSetupModule {}
