import { NgModule } from "@angular/core";
import { ProfileSetupComponent } from "./profile-setup.component";
import { ProfileSetupRoutingModule } from "./profile-setup-routing.module";
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProfileSetupFormComponent } from "./components/profile-setup-form/profile-setup-form.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [ProfileSetupFormComponent, ProfileSetupComponent],
  imports: [
    SharedModule,
    IonicModule,
    FormsModule,
    ProfileSetupRoutingModule,
    ReactiveFormsModule,
    SharedModule
],
})
export class ProfileSetupModule {}
