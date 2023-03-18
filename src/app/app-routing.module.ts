import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPageComponent } from './view/user-page/user-page.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', redirectTo: 'view', pathMatch: 'full' },
  { path: 'view', component: ViewComponent },
  {path:'view/:id',component:UserPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
