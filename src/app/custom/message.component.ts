import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  NgModule,
} from '@angular/core';
import {
  GlobalMessage,
  GlobalMessageConfig,
  GlobalMessageEntities,
  GlobalMessages,
  GlobalMessageService,
  GlobalMessageType,
  GlobalMessageTypeConfig,
  I18nModule,
} from '@spartacus/core';
import { IconModule, ICON_TYPE } from '@spartacus/storefront';
import { Observable, of, pipe } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { CUSTOM_MESSAGE_TYPES } from './custom-message-types.token';

@Component({
  template: `
    <div
      class="alert"
      [ngClass]="message.classes || ''"
      [ngStyle]="message.styles || {}"
      *ngFor="let message of messages$ | async; index as i"
    >
      <span class="alert-icon">
        <cx-icon
          *ngIf="message.icon"
          [type]="iconTypes[message.icon]"
        ></cx-icon>
      </span>
      <span>{{ message.text | cxTranslate }}</span>
      <button class="close" type="button" (click)="clear(message.type, i)">
        <cx-icon [type]="iconTypes.CLOSE"></cx-icon>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  iconTypes = ICON_TYPE;
  messages$: Observable<CustomMessage[]>;

  constructor(
    private globalMessageService: GlobalMessageService,
    { globalMessages }: GlobalMessageConfig,
    @Inject(CUSTOM_MESSAGE_TYPES) customMessageTypes: GlobalMessageType[]
  ) {
    if (!globalMessages) {
      this.messages$ = of([]);
      return;
    }

    this.messages$ = this.globalMessageService
      .get()
      .pipe(
        filterByType(customMessageTypes),
        mergeWithConfigs(globalMessages),
        startWith([])
      );
  }

  clear(type: GlobalMessageType, index: number): void {
    this.globalMessageService.remove(type, index);
  }
}

function filterByType(types: GlobalMessageType[]) {
  return map((messages: GlobalMessageEntities) =>
    types.reduce((acc: GlobalMessage[], type) => {
      const messagesOfType = messages[type];

      if (messagesOfType) {
        messagesOfType.forEach((text) => acc.push({ text, type }));
      }

      return acc;
    }, [])
  );
}

function mergeWithConfigs(configs: GlobalMessages) {
  return pipe(
    distinctUntilChanged<GlobalMessage[]>(
      (a, b) => JSON.stringify(a) === JSON.stringify(b)
    ),
    map((messages) =>
      messages.map((message) => ({ ...message, ...configs[message.type] }))
    )
  );
}

@NgModule({
  exports: [MessageComponent],
  declarations: [MessageComponent],
  imports: [CommonModule, I18nModule, IconModule],
})
export class CustomMessageModule {}

type CustomMessage = GlobalMessage & GlobalMessageTypeConfig;
