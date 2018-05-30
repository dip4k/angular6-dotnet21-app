import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MakeService {

  constructor(private http: HttpClient) { }

  getFeatures() {
    return this.http.get('/api/features');
  }

  getMakes() {
    return this.http.get<any[]>('/api/makes');
  }
}
