import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

// service to handle errors
@Injectable({ providedIn: 'root' })
export class ErrorLogService {
  public logError(error: any) {
    const date = new Date().toISOString();
    if (error instanceof HttpErrorResponse) {
      console.error(
        JSON.stringify(
          {
            date,
            errorType: 'There was an HTTP error.',
            errorMessage: error.message,
            statusCode: (<HttpErrorResponse>error).status
          },
          undefined,
          2
        )
      );
    } else if (error instanceof TypeError) {
      console.error(
        JSON.stringify(
          {
            date,
            type: 'There was a Type error.',
            message: error.message
          },
          undefined,
          2
        )
      );
    } else if (error instanceof Error) {
      console.error(
        JSON.stringify(
          {
            date,
            type: 'There was a general error.',
            message: error.message
          },
          undefined,
          2
        )
      );
    } else {
      console.error(
        JSON.stringify(
          {
            date,
            type: 'Nobody threw an Error but something happened!',
            error
          },
          undefined,
          2
        )
      );
    }
  }
}
