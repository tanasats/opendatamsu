import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'', redirectTo:'admin', pathMatch:'full'},
  { path: 'guest',loadChildren:()=> import('./guest/guest-routing.module').then(m=>m.GuestRoutingModule)},
  { path: 'admin',loadChildren:()=> import('./admin/admin-routing.module').then(m=>m.AdminRoutingModule)},


  { path: '**', redirectTo:'admin',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
