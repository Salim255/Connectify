import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountComponent } from "./account.component";

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./components/account-dashboard/account-dashboard.module').then(m => m.AccountDashboardModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./components/settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'account-profile',
        loadChildren: () => import('./components/settings/settings.module').then(m => m.SettingsModule)
      },
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
