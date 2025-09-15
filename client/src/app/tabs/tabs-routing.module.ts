import { NgModule } from "@angular/core";
import { TabsComponent } from "./tabs.component";
import { RouterModule, Routes } from "@angular/router";
import { ProfileGuard } from "../core/guard/profile.guard";


const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    canActivate: [ProfileGuard],
    children:[
      {
        path: '',
        redirectTo: 'browse',
        pathMatch: 'full'
      },
      {
        path: 'browse',
        loadChildren: () => import('../features/browse/browser.module').then(m => m.BrowserModule)
      },
      {
        path: 'chats',
        loadChildren: () => import('../features/chats/chats.module').then(m => m.ChatsModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../features/account/account.module').then(m => m.AccountModule)
      },
      {
        path: 'matches',
        loadChildren: () => import('../features/matches/matches.module').then(m => m.MatchesModule)
      }
    ]
  },
  {
    path: 'chat',
    loadChildren: () => import('../features/chat/chat.module').then(m => m.ChatModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('../features/profile/profile.module').then(m => m.ProfileModule )
  },
  {
    path: 'profile-setup',
    loadChildren: () => import('../features/profile-setup/profile-setup.module').then(m => m.ProfileSetupModule )

  },
]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
,
})
export class TabsRoutingModule {}
