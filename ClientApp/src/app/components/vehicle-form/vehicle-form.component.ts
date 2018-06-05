import { Component, OnInit } from '@angular/core';

import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  models;
  vehicle: any = {};
  features;
  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {
    this.vehicleService.getMakes().subscribe((res) => {
      this.makes = res;
    });

    this.vehicleService.getFeatures().subscribe((res) => {
      console.log(res);
      this.features = res;
    });
  }

  onMakeChange(element) {
    const id = element.target.value;
    const selectedMake = this.makes.find((m) => m.id == this.vehicle.make);
    this.models = selectedMake ? selectedMake.models : [];
  }
}
