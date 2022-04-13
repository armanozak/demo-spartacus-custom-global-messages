import { InjectionToken } from '@angular/core';
import { GlobalMessageType } from '@spartacus/core';

export const CUSTOM_MESSAGE_TYPES = new InjectionToken('CUSTOM_MESSAGE_TYPES', {
  providedIn: 'root',
  factory: () => [
    GlobalMessageType.MSG_TYPE_FAVORITE,
    GlobalMessageType.MSG_TYPE_TEAPOT,
  ],
});
