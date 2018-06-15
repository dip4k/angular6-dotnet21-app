import { Injectable, ErrorHandler } from '@angular/core';

@Injectable()
export class LogglyLoggerService {
  // https://github.com/loggly/loggly-jslogger
  private loggly: any = new LogglyTracker();

  constructor() {
    this.loggly.push({
      logglyKey: 'YOUR_LOGGLY_TOKEN',
      sendConsoleErrors: true,
      tag: 'Angular6-logs'
    });
  }

  log(error: Error) {
    // do not push error as it will fail due to circular structure
    this.loggly.push({ message: error.message, stack: error.stack });
  }
}

@Injectable()
class GlobalErrorHandler extends ErrorHandler {
  constructor(private loggerService: LogglyLoggerService) {
    super();
  }

  handleError(error) {
    this.loggerService.log(error);
  }
}

// providers: [
//   {
//     provide: ErrorHandler,
//     useClass: GlobalErrorHandler
//   },
//   // register the service
//   LogglyLoggerService,
// ]
