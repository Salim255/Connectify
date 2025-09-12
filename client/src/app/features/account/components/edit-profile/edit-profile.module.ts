import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { EditProfileComponent } from "./edit-profile.component";
import { EditProfileRoutingModule } from "./edit-profile-routing.module";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    EditProfileRoutingModule
  ],
  declarations: [EditProfileComponent]
})
export class EditProfileModule {}
