import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Buddy } from '../models/buddy';

@Injectable({
  providedIn: 'root'
})
export class BuddyService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };
  // private host = 'http://192.168.43.23:3000/';
  private host = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getList(): Observable<any> {
    return this.http.get<any>(this.host + 'api/buddy/all', this.httpOptions);
  }

  addBuddy(buddy: Buddy): Observable<any> {
    const temp = {
      name: buddy.name,
      address: buddy.address,
      postal_code: buddy.postal_code,
      phone: buddy.phone,
      service_type: buddy.service_type
    };
    const data = JSON.stringify(temp);
    return this.http.post<Buddy>(this.host + 'api/buddy/add', data, this.httpOptions);
  }

  getBuddy(buddy: Buddy): Observable<any> {
    const data = JSON.stringify(buddy);
    return this.http.post<any>(this.host + 'api/buddy/' + buddy.service_type + '/' + buddy.id, data, this.httpOptions);
  }
   
  editBuddy(buddy: Buddy): Observable<any> {
    return this.http.post<any>(this.host + 'api/buddy/edit/' + buddy.service_type + '/' + buddy.id, buddy, this.httpOptions);
  }

  deleteBuddy(buddy: Buddy): Observable<any> {
    return this.http.post<any>(this.host + 'api/buddy/delete/' + buddy.service_type + '/' + buddy.id, buddy, this.httpOptions);
  }
}
