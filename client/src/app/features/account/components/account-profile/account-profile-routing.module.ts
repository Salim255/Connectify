import { NgModule } from "@angular/core";
import { AccountProfileComponent } from "./account-profile.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: AccountProfileComponent,
    children: [
      {
        path: '', redirectTo: 'view', pathMatch: 'full',
      },
      {
        path: 'view',
        loadChildren: () => import('../view-profile/view-profile.module').then(m => m.ViewProfileModule)
      },
      {
        path: 'edit',
        loadChildren: () => import('../edit-profile/edit-profile.module').then(m => m.EditProfileModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AccountProfileRoutingModule {}
