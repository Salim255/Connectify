import { NgModule } from "@angular/core";
import { ProfileSetupComponent } from "./profile-setup.component";
import { ProfileSetupRoutingModule } from "./profile-setup-routing.module";
import { IonicModule } from "@ionic/angular";

@NgModule({
  declarations: [ProfileSetupComponent],
  imports: [
    IonicModule,
    ProfileSetupRoutingModule],
})
export class ProfileSetupModule {}
