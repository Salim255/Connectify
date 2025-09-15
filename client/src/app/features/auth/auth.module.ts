import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { IonicModule } from "@ionic/angular";
import { AuthFormComponent } from "./components/auth-form/auth-form.component";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AuthRoutingModule,
  ],
  declarations: [AuthFormComponent, AuthComponent]
})
export class AuthModule {}
