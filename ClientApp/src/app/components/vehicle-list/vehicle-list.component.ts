import { KeyValuePair } from './../../models/vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

import { Vehicle } from '../../models/vehicle';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  allVehicles: Vehicle[];
  makes: any[];
  filter = { makeId: 0 };
  constructor(private _vehicleService: VehicleService) {}

  ngOnInit() {
    // this._vehicleService.getMakes().subscribe((m) => {
    //   this.makes = <any[]>m;
    // });
    // this._vehicleService.getVehicles().subscribe((vList) => {
    //   this.vehicles = this.allVehicles = <Vehicle[]>vList;
    // });

    forkJoin(
      this._vehicleService.getMakes(),
      this._vehicleService.getVehicles()
    ).subscribe((data) => {
      this.makes = <KeyValuePair[]>data[0];
      this.vehicles = this.allVehicles = <Vehicle[]>data[1];
    });
  }

  onFilterChange() {
    let vehicles = this.allVehicles;
    if (this.filter.makeId) {
      vehicles = vehicles.filter((v) => v.make.id == this.filter.makeId);
    }
    this.vehicles = vehicles;
  }

  resetFilter() {
    this.filter = { makeId: 0 };
    this.onFilterChange();
  }
}
