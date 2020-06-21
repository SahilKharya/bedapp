import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopNavComponent } from './top-nav/top-nav.component';
import { AppMaterialModule } from '../app.material.module';
import { UiRoute } from './ui.routes';
import { RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { HospitalsComponent } from './hospitals/hospitals.component';

@NgModule({
  declarations: [TopNavComponent, AccountComponent, HomeComponent, HospitalsComponent],
  imports: [
    AppMaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(UiRoute)
  ],
  exports: [
    TopNavComponent,
  ], providers: [

  ]
})
export class UiModule { }
