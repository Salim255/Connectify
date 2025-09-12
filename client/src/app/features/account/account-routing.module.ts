import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountComponent } from "./account.component";

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'view',
        loadChildren: () => import('./components/view-profile/view-profile.module').then(m => m.ViewProfileModule)
      },
      {
        path: 'edit',
        loadChildren: () => import('./components/edit-profile/edit-profile.module').then(m => m.EditProfileModule)
      }

    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
