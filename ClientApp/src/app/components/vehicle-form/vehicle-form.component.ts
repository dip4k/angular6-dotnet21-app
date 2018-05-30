import { Component, OnInit } from '@angular/core';
import { MakeService } from '../../services/make.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes : any[];
  models;
  vehicle :any = {};
  constructor(private makeService:MakeService) { }

  ngOnInit() {
    this.makeService.getMakes().subscribe(res => {
      this.makes = res;
    });
  }

  onMakeChange(element) {
    let id = element.target.value;
    let selectedMake = this.makes.find(m => m.id == this.vehicle.make);
    this.models = selectedMake ? selectedMake.models : [];
    
  }

}
