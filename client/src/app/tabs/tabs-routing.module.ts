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
