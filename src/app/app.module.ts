import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  GlobalMessageType,
  HttpErrorHandler,
  provideConfig,
} from '@spartacus/core';
import {
  AppRoutingModule,
  ICON_TYPE,
  OutletPosition,
  provideOutlet,
} from '@spartacus/storefront';
import { AppComponent } from './app.component';
import {
  MessageComponent,
  CustomMessageModule,
} from './custom/message.component';
import { TeapotHandler } from './custom/teapot.handler';
import { SpartacusModule } from './spartacus/spartacus.module';
import './custom/models';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    SpartacusModule,
    BrowserTransferStateModule,
    CustomMessageModule,
  ],
  providers: [
    provideConfig({
      globalMessages: {
        [GlobalMessageType.MSG_TYPE_FAVORITE]: {
          icon: ICON_TYPE.HEART,
          classes: 'alert-info',
          timeout: 5000,
        },
        [GlobalMessageType.MSG_TYPE_TEAPOT]: {
          icon: ICON_TYPE.STAR,
          styles: {
            backgroundColor: '#E7E0F7',
            color: '#7C69A5',
          },
          timeout: 5000,
        },
      },
    }),
    provideOutlet({
      id: 'BottomHeaderSlot',
      position: OutletPosition.AFTER,
      component: MessageComponent,
    }),
    {
      provide: HttpErrorHandler,
      useClass: TeapotHandler,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (client: HttpClient) => () => {
        client.get('https://httpstat.us/418').subscribe();
      },
      deps: [HttpClient],
      multi: true,
    },
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
