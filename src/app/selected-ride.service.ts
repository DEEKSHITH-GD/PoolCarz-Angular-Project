import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedRideService {

  private selectedRide: any;
  constructor() { }
  
  setSelectedRide(ride: any) {
    this.selectedRide = ride;
  }

  getSelectedRide() {
    return this.selectedRide;
  }
}
