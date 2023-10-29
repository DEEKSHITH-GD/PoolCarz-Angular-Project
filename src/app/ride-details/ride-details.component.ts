import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html',
  styleUrls: ['./ride-details.component.css']
})
export class RideDetailsComponent implements OnInit {
  @Input() ride: any;
  @Input() userName!: string;
  @Output() TableOff: EventEmitter<void> = new EventEmitter<void>();
  @Output() TableOn: EventEmitter<void> = new EventEmitter<void>();
  @Output() cannotBookOwnRide: EventEmitter<boolean> = new EventEmitter<boolean>(); // Add this event
  @Output() cancelRide: EventEmitter<void> = new EventEmitter<void>();
  @Output() handleBooking: EventEmitter<number> = new EventEmitter<number>();

  notAvailabe: boolean = false;
  isBooked: boolean = false;
  bookingId!: number;
  isCannotBookOwnRide: boolean = false;

  toggleBooking() {
    
    if (this.userName === this.ride.name) {

      this.notAvailabe = false;
      this.isCannotBookOwnRide = true;
      this.cannotBookOwnRide.emit(true);
    } else if (this.isBooked) {
      this.notAvailabe = false;
      this.isBooked = false; // Set isBooked to false
      // Emit the cancelRide event when the ride is canceled
      this.TableOn.emit();
      this.cancelRide.emit();
      this.isCannotBookOwnRide = false;
    } else if(this.ride.seatsAvailable == 0){
      console.log('not avaiable');
      this.notAvailabe = true; 
    } else if (this.ride.seatsAvailable > 0){
      this.notAvailabe = false;
      // Simulate a random booking ID (you can generate a proper ID)
      this.bookingId = Math.floor(Math.random() * 1000);
      this.isBooked = true;
      this.isCannotBookOwnRide = false;
      this.TableOff.emit();
      this.handleBooking.emit();
    }
  }

  ngOnInit(): void {
  }
}
