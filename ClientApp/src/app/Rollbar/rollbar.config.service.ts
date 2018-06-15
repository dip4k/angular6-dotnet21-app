import * as Rollbar from 'rollbar';
import { InjectionToken } from '@angular/core';
// constants
const rollbarConfig = {
  accessToken: '9a3c8a3a4e9345cf938d510534aeb2bb',
  captureUncaught: true,
  captureUnhandledRejections: true
};

export function rollbarFactory() {
  return new Rollbar(rollbarConfig);
}

export const RollbarService = new InjectionToken<Rollbar>('rollbar');
