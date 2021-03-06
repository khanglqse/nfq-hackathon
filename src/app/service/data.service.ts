import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  endpoint = 'https://rp1-6261-api.eu.dev.roadsurfer.com'
  getTodo(type: string, model: any = {}) {
    return this.http.get(`${this.endpoint}/hackathon/dashboard/${type}`, {params: model})
  }

  getBooking(filter: any) {
    return this.http.get(`${this.endpoint}/hackathon/new-bookings`, {params: filter.station_id || filter.country_id ? filter : null})
  }
  getCustomer(filter: any) {
    return this.http.get(`${this.endpoint}/hackathon/new-customers`, {params: filter.station_id || filter.country_id ? filter : null})
  }
  getRevenue(filter: any) {
    return this.http.get(`${this.endpoint}/hackathon/revenue/${filter.date}`)
  }
}
