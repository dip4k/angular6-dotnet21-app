import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private http: HttpClient) {}

  getFeatures() {
    return this.http.get('/api/features');
  }

  getMakes() {
    return this.http.get<any[]>('/api/makes');
  }

  createVehicle(vehicle) {
    return this.http.post('/api/vehicles', vehicle);
  }

  getVehicle(id) {
    return this.http.get('/api/vehicles/' + id);
  }
}
