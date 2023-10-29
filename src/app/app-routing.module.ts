import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { BookRideComponentComponent } from './book-ride-component/book-ride-component.component';
import { OfferRideComponent } from './offer-ride/offer-ride.component';

// Routing configuration
const appRoutes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'book-ride-component', component: BookRideComponentComponent },
  { path: 'offer-ride', component: OfferRideComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' }, // The default route should be placed last
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
