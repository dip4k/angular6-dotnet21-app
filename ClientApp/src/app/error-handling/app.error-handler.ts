import { ToastrService } from 'ngx-toastr';
import {
  ErrorHandler,
  Injectable,
  Injector,
  NgZone,
  isDevMode
} from '@angular/core';
import { ErrorLogService } from '../services/error.log.service';
import { RollbarService } from '../Rollbar/rollbar.config.service';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  // Because the ErrorHandler is created before the providers, we’ll have to use the Injector to get dependant services.
  constructor(private ngZone: NgZone, private injector: Injector) {}
  handleError(error: any): void {
    // use of injector to get services
    if (!isDevMode()) {
      const _rollbar = this.injector.get(RollbarService);
      _rollbar.error(error.originalError || error);
    }
    const _errorLogService = this.injector.get(ErrorLogService);
    _errorLogService.logError(error);
    const _toasty = this.injector.get(ToastrService);
    this.ngZone.run(() => {
      _toasty.error('Unexpected Error Occured', 'Error');
    });
  }
}
