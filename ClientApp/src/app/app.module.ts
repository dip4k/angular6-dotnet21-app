// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './routing/app-routing.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// services
import { VehicleService } from './services/vehicle.service';
import { AppErrorHandler } from './error-handling/app.error-handler';

// components
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { CounterComponent } from './components/counter/counter.component';
import { FetchDataComponent } from './components/fetch-data/fetch-data.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { ErrorLogService } from './services/error.log.service';

// rollbar imports
import {
  RollbarService,
  rollbarFactory
} from './Rollbar/rollbar.config.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    VehicleFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      progressBar: true,
      preventDuplicates: true,
      progressAnimation: 'increasing',
      closeButton: true
    }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule
  ],
  providers: [
    ErrorLogService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: RollbarService, useFactory: rollbarFactory },
    VehicleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
