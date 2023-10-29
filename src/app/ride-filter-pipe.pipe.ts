import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rideFilterPipe'
})
export class RideFilterPipe implements PipeTransform {
  transform(rides: any[], filterCategory: string): any[] {
    if (!rides || !filterCategory) {
      return rides;
    }

    // Filter the rides based on the selected category
    if (filterCategory === 'To Office') {
      return rides.filter(ride => ride.category === 'To Office');
    } else if (filterCategory === 'From Office') {
      return rides.filter(ride => ride.category === 'From Office');
    } else if (filterCategory === 'Others') {
      return rides.filter(ride => ride.category === 'Others');
    } else {
      return rides; // No filter applied if the category is not recognized
    }
  }
}
