import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

import { Vehicle } from '../../models/vehicle';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  constructor(private _vehicleService: VehicleService) {}

  ngOnInit() {
    this._vehicleService.getVehicles().subscribe((vList) => {
      this.vehicles = <Vehicle[]>vList;
    });
  }
}
