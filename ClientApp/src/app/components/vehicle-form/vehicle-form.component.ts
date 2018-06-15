import { Component, OnInit } from '@angular/core';

import { VehicleService } from '../../services/vehicle.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  models: any[];
  vehicle: any = {
    features: [],
    contact: {}
  };
  features;
  constructor(
    private vehicleService: VehicleService,
    private _toaster: ToastrService
  ) {}

  ngOnInit() {
    this.vehicleService.getMakes().subscribe((res) => {
      this.makes = res;
    });

    this.vehicleService.getFeatures().subscribe((res) => {
      this.features = res;
    });
  }

  onMakeChange(element) {
    delete this.vehicle.modelId;
    const selectedMake = this.makes.find((m) => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }

  onToggleFeature(featureId, $event) {
    if ($event.target.checked) {
      this.vehicle.features.push(featureId);
    } else {
      const index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    this.vehicleService.createVehicle(this.vehicle).subscribe((res) => {
      this._toaster.success(
        'Vehicle created successfully with id :' + res['id'],
        'Success'
      );
    });
  }
}
