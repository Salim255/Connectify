import { RouterModule, Routes } from "@angular/router";
import { ViewProfileComponent } from "./view-profile.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: ViewProfileComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ViewProfileRoutingModule {}
