import { VehicleListComponent } from './../components/vehicle-list/vehicle-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CounterComponent } from '../components/counter/counter.component';
import { HomeComponent } from '../components/home/home.component';
import { FetchDataComponent } from '../components/fetch-data/fetch-data.component';
import { VehicleFormComponent } from '../components/vehicle-form/vehicle-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent },
  { path: 'vehicles', component: VehicleListComponent },
  { path: 'vehicles/new', component: VehicleFormComponent },
  { path: 'vehicles/:id', component: VehicleFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
