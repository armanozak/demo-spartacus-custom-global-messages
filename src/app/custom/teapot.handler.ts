import { Injectable } from '@angular/core';
import { HttpErrorHandler, GlobalMessageType, Priority } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class TeapotHandler extends HttpErrorHandler {
  responseStatus = 418;

  handleError() {
    this.globalMessageService.add(
      "HA HA! I'm a teapot!",
      GlobalMessageType.MSG_TYPE_TEAPOT
    );
  }

  getPriority() {
    return Priority.NORMAL;
  }
}
