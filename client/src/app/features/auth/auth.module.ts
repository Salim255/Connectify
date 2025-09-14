import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { IonicModule } from "@ionic/angular";

@NgModule({
  imports: [
    IonicModule,
    AuthRoutingModule],
  declarations: [AuthComponent]
})
export class AuthModule {}
