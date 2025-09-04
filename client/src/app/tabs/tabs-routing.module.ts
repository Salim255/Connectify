import { NgModule } from "@angular/core";
import { TabsComponent } from "./tabs.component";
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children:[
      {
        path: 'browse',
        loadChildren: () => import('../features/browse/browser.module').then(m => m.BrowserModule)
      },
      {
        path: 'chats',
        loadChildren: () => import('../features/chats/chats.module').then(m => m.ChatsModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../features/profile/profile.module').then(m => m.ProfileModule )
      }
    ]
  }
]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
,
})
export class TabsRoutingModule {}
