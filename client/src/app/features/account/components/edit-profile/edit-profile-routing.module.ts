import { NgModule } from "@angular/core";
import { EditProfileComponent } from "./edit-profile.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: EditProfileComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EditProfileRoutingModule {}
