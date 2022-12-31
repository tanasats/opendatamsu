import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TagmanagerComponent } from './pages/tagmanager/tagmanager.component';


@NgModule({
  declarations: [
    DashboardComponent,
    TagmanagerComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,ReactiveFormsModule
  ]
})
export class AdminModule { }
