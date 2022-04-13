import { GlobalMessageType } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';

declare module '@spartacus/core' {
  interface GlobalMessage {
    icon?: ICON_TYPE;
  }
}

declare module '../../../node_modules/@spartacus/core/src/global-message/models/global-message.model' {
  enum GlobalMessageType {
    MSG_TYPE_FAVORITE = '[GlobalMessage] Favorite',
    MSG_TYPE_TEAPOT = '[GlobalMessage] Teapot',
  }
}

(GlobalMessageType as any)['MSG_TYPE_FAVORITE'] = '[GlobalMessage] Favorite';
(GlobalMessageType as any)['MSG_TYPE_TEAPOT'] = '[GlobalMessage] Teapot';

declare module '../../../node_modules/@spartacus/core/src/global-message/config/global-message-config' {
  interface GlobalMessageTypeConfig {
    icon?: ICON_TYPE;
    classes?: string | string[];
    styles?: Partial<CSSStyleDeclaration>;
  }

  interface GlobalMessages {
    [GlobalMessageType.MSG_TYPE_FAVORITE]: GlobalMessageTypeConfig;
    [GlobalMessageType.MSG_TYPE_TEAPOT]: GlobalMessageTypeConfig;
  }
}

export {};
