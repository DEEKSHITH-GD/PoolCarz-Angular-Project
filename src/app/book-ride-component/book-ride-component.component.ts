import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RideService } from '../ride.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';
import { SelectedRideService } from '../selected-ride.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-book-ride-component',
  templateUrl: './book-ride-component.component.html',
  styleUrls: ['./book-ride-component.component.css']
})
export class BookRideComponentComponent implements OnInit {
  isClicked: { [key: number]: boolean } = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  };
  @Output() cannotBookOwnRide: EventEmitter<boolean> = new EventEmitter<boolean>();
  hideTable: boolean = false;
  selectedCategory: string = '';
  showAdditionalButtons: boolean = false;
  showTable: boolean = false;
  selectedRide: any | null = null; // Property to store the selected ride
  userName!: string;
  isBookingDone: boolean = false;
  bookingId: number = 0;
  isCannotBookOwnRide: boolean = false;
  isTableHidden = false;

  constructor(private rideService: RideService, private router: Router, private route: ActivatedRoute, private restService: RestService, private selectedRideService: SelectedRideService, private userService: UserService) {
    this.fetchRides(); // Fetch rides data from JSON file
  }

  fetchRides() {
    // Fetch ride data using RestService
    this.restService.getRides().subscribe((data) => {
        this.rides = data;
    });
  }

  rides: any[] = [];

  changeColor(buttonNumber: number) {
    this.isClicked[buttonNumber] = !this.isClicked[buttonNumber];
    if (buttonNumber === 1) {
      this.showAdditionalButtons = this.isClicked[1];
      this.showTable = this.isClicked[1];
    }
  }

  changeCategory(category: string) {
    this.selectedCategory = category;
  }

  offerARide() {
    this.router.navigate(['/offer-ride']);
  }

  selectRide(ride: any) {
    // Store the selected ride in the selected ride service
    this.selectedRide = ride;
    if (this.userName === ride.name) {
      this.cannotBookOwnRide.emit(true);
    }
  }
  
  handleCannotBookOwnRide(cannotBookOwnRide: boolean) {
    this.isCannotBookOwnRide = cannotBookOwnRide;
  }  

  handleBookingDone(bookingIsDone: boolean) {
    this.showAdditionalButtons = !bookingIsDone;
    this.showTable = !bookingIsDone; // Hide the table when a booking is done
  }
  
  handleBooking(bookingId: number) {
    console.log("Book button clicked");
    if (this.selectedRide) {
      // Decrease the seats when a ride is booked
      this.selectedRide.seatsAvailable--;

      // Update the seatsAvailable value in the rides.json file on the server
      this.restService.updateSeatsAvailable(this.selectedRide).subscribe(() => {
        this.isBookingDone = true;
        this.bookingId = bookingId;
        this.isTableHidden = true;
      });
    }
  }

  cancelRide() {
    console.log("Cancel Ride button clicked");
    if (this.selectedRide) {
      console.log("Cancel Ride button clicked");
      // Increase the seats locally in the component immediately
      this.selectedRide.seatsAvailable++;
  
      // Update the seatsAvailable value in the rides.json file on the server
      this.restService.updateSeatsAvailable(this.selectedRide).subscribe(() => {
        console.log("Cancel Ride button clicked");
        this.fetchRides();
        this.isBookingDone = false;
        this.bookingId = 0;
        this.isTableHidden = false;
      });
    }
  } 

  TableOff(){
    this.showTable = false;
  }

  TableOn(){
    this.showTable = true;
  }

  ngOnInit(): void {
    this.userName = this.userService.getUsername();
    //console.log(this.userName);
  }
}
