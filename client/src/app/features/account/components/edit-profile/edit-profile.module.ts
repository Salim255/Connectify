import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { EditProfileComponent } from "./edit-profile.component";
import { EditProfileRoutingModule } from "./edit-profile-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    EditProfileRoutingModule,
    SharedModule
],
  declarations: [EditProfileComponent]
})
export class EditProfileModule {}
