import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { ViewProfileComponent } from "./view-profile.component";
import { ViewProfileRoutingModule } from "./view-profile-routing.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ViewProfileRoutingModule
  ],
  declarations:[ ViewProfileComponent ],
})

export class ViewProfileModule {}
