import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private http: HttpClient) {}
  ridesUrl = 'http://localhost:3000/rides';

  // Fetch ride data from the server
  getRides(): Observable<any[]> {
    return this.http.get<any[]>(this.ridesUrl); 
  }

  // Check user data validity from a JSON file (if still needed)
  checkUserData(username: string, password: string): Observable<boolean> {
    return this.http.get<{ username: string; password: string; valid: boolean }[]>('assets/users.json').pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);
        return user ? user.valid : false;
      })
    );
  }

  updateSeatsAvailable(updatedRide: any): Observable<any> {
    const url = `${this.ridesUrl}/${updatedRide.id}`;
    return this.http.put(url, updatedRide);
  }
  
}
