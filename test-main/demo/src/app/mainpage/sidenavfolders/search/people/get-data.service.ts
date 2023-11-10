import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAllData(
    page: number,
    size: number,
    jobTitles?: string[],
    location?: string,
    country?: string
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
  
    if (jobTitles) {
      params = params.set('JobTitles', jobTitles.join(','));
    }
  
    if (location) {
      params = params.set('Location', location);
    }
  
    if (country) {
      params = params.set('Country', country);
    }
  
    return this.http.get(`${this.apiUrl}/api/all`, { params });
  }
  getListOfCountries(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/all?Country`);
  }  
}