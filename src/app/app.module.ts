import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { BookRideComponentComponent } from './book-ride-component/book-ride-component.component';
import { MouseHoverDirectiveDirective } from './mouse-hover-directive.directive';
import { RideFilterPipe } from './ride-filter-pipe.pipe';
import { OfferRideComponent } from './offer-ride/offer-ride.component';
import { RideDetailsComponent } from './ride-details/ride-details.component';

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule],
    declarations: [AppComponent, WelcomeComponent, LoginComponent, BookRideComponentComponent, MouseHoverDirectiveDirective, RideFilterPipe, OfferRideComponent, RideDetailsComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
