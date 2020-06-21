import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { HospitalsComponent } from './hospitals/hospitals.component';
export const UiRoute: Routes = [
  { path: '', redirectTo: 'money', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'account', component: AccountComponent},
  { path: 'hospitals', component: HospitalsComponent}

];


