import * as Rollbar from 'rollbar';
import { BrowserModule } from '@angular/platform-browser';
import {
  Injectable,
  Injector,
  InjectionToken,
  NgModule,
  ErrorHandler
} from '@angular/core';
// import { AppComponent } from './app.component';

const rollbarConfig = {
  accessToken: '9a3c8a3a4e9345cf938d510534aeb2bb',
  captureUncaught: true,
  captureUnhandledRejections: true
};

@Injectable()
export class RollbarErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(err: any): void {
    const rollbar = this.injector.get(RollbarService);
    rollbar.error(err.originalError || err);
  }
}

export function rollbarFactory() {
  return new Rollbar(rollbarConfig);
}

export const RollbarService = new InjectionToken<Rollbar>('rollbar');

// @NgModule({
//   imports: [BrowserModule],
//   declarations: [AppComponent],
//   bootstrap: [AppComponent],
//   providers: [
//     { provide: ErrorHandler, useClass: RollbarErrorHandler },
//     { provide: RollbarService, useFactory: rollbarFactory }
//   ]
// })
// export class AppModule { }
