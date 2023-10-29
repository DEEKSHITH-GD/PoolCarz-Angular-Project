import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RideService {
  private ridesUrl = 'http://localhost:3000/rides'; // Replace with the correct URL

  constructor(private http: HttpClient) {}

  getRides(): Observable<any[]> {
    return this.http.get<any[]>(this.ridesUrl);
  }

  addRide(newRide: any): Observable<any> {
    // You don't need to fetch the rides in this method; the server will handle it
    return this.http.post(this.ridesUrl, newRide);
  }
}
