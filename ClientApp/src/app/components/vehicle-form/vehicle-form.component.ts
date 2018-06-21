import { SaveVehicle } from './../../models/vehicle';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { VehicleService } from '../../services/vehicle.service';
import { ArrayUtilities } from '../../utility-functions/array-utilities';
import { ToastrService } from 'ngx-toastr';

import { Vehicle } from '../../models/vehicle';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  models: any[];
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: { name: '', email: '', phone: '' }
  };
  features;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private _toaster: ToastrService
  ) {
    route.params.subscribe((p) => {
      this.vehicle.id = +p['id'];
    });
  }

  ngOnInit() {
    const sources = [this.vehicleService.getMakes(), this.vehicleService.getFeatures()];

    if (this.vehicle.id) {
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));
    }

    forkJoin(sources).subscribe(
      (data) => {
        this.makes = <any[]>data[0];
        this.features = data[1];
        if (this.vehicle.id) {
          this.setVehicle(<Vehicle>data[2]);
          this.populateModels();
        }
      },
      (error) => {
        if (error.status == 404) {
          this._toaster.error('Resource not found...redirecting', 'Invalid id');
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 5000);
        }
      }
    );
  }

  private populateModels() {
    const selectedMake = this.makes.find((m) => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }

  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = ArrayUtilities.pluck(v.features, 'id');
  }
  onMakeChange() {
    this.populateModels();
    delete this.vehicle.modelId;
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
    if (this.vehicle.id) {
      console.log('inside update');
      this.vehicleService.update(this.vehicle).subscribe((res) => {
        this._toaster.success(
          'Vehicle updated successfully with id :' + res['id'],
          'Success'
        );
        setTimeout(() => {
          this.router.navigate([ '/' ]);
        }, 5000);
      });
    } else {
      console.log('inside create');
      this.vehicle.id = 0;
      this.vehicleService.create(this.vehicle).subscribe(
        (res) => {
          this._toaster.success(
            'Vehicle created successfully with id :' + res['id'],
            'Success'
          );
          setTimeout(() => {
            this.router.navigate([ '/' ]);
          }, 5000);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  delete() {
    this.vehicleService.delete(this.vehicle.id).subscribe((x) => {
      this._toaster.success('Resource deleted successfully');
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 5000);
    });
  }
}
