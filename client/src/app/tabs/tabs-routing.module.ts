import { NgModule } from "@angular/core";
import { TabsComponent } from "./tabs.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children:[
      {
        path: '/browse',
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
