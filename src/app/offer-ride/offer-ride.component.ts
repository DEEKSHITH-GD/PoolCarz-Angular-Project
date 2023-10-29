import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RideService } from '../ride.service';

@Component({
  selector: 'app-offer-ride',
  templateUrl: './offer-ride.component.html',
  styleUrls: ['./offer-ride.component.css']
})
export class OfferRideComponent implements OnInit {
  rideForm: FormGroup;
  rideAddedSuccessfully: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private rideService: RideService) {
    this.rideForm = this.fb.group({
      name: ['', [Validators.required]],
      startLocation: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      car: ['', [Validators.required]],
      seatsAvailable: ['', [Validators.required, this.validateSeatsAvailable]],
    });
  }

  ngOnInit() {}

  validateSeatsAvailable(control: AbstractControl) {
    const seats = control.value;
    if (seats >= 0 && seats <= 8) {
      return null; // Seats Available is valid
    } else {
      return { validSeats: true }; // Seats Available is not valid
    }
  }

  onSubmit() {
    if (this.rideForm.valid) {
      // Form is valid, get the ride details from the form
      const newRide = this.rideForm.value;

      // Determine the category based on destination and pickup
      if (newRide.destination === 'Office') {
        newRide.category = 'To Office';
      } else if (newRide.startLocation === 'Office') {
        newRide.category = 'From Office';
      } else {
        newRide.category = 'Others';
      }

      // Add the new ride to the rides.json file using the RideService
      this.rideService.addRide(newRide).subscribe((response) => {
        if (response) {
          // Ride added successfully
          this.rideAddedSuccessfully = true; // Set rideAddedSuccessfully to true
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/book-ride-component']);
  }
}
