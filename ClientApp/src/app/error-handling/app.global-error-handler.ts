import { Injectable, ErrorHandler } from '@angular/core';
import { ErrorLogService } from '../services/error.log.service';

// global error handler that utilizes the above created service (ideally in its own file)

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
  constructor(private errorLogService: ErrorLogService) {
    super();
  }

  handleError(error) {
    this.errorLogService.logError(error);
  }
}
