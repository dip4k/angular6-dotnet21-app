import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

// service to handle errors
@Injectable({ providedIn: 'root' })
export class ErrorLogService {
  public logError(error: any) {
    const date = new Date().toISOString();
    if (error instanceof HttpErrorResponse) {
      console.error(
        date,
        'There was an HTTP error.',
        error.message,
        'Status code:',
        (<HttpErrorResponse>error).status
      );
    } else if (error instanceof TypeError) {
      console.error(date, 'There was a Type error.', error.message);
    } else if (error instanceof Error) {
      console.error(date, 'There was a general error.', error.message);
    } else {
      console.error(
        date,
        'Nobody threw an Error but something happened!',
        error
      );
    }
  }
}
