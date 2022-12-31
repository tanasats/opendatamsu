import { TagmanagerComponent } from './pages/tagmanager/tagmanager.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', redirectTo:'dashboard', pathMatch: 'full'},
  {path:'dashboard', component:DashboardComponent},
  {path:'tagmanager', component:TagmanagerComponent},
  {path: '**',redirectTo: '/guest'}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
