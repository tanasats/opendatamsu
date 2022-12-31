import { CoreModule } from './core/core.module';
import { GuestModule } from './guest/guest.module';
import { AdminModule } from './admin/admin.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
   // FormsModule,ReactiveFormsModule,
    CoreModule,
    AdminModule,
    GuestModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
