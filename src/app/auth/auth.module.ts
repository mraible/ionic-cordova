import { Requestor, StorageBackend } from '@openid/appauth';
import { NgModule, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Platform } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { browserFactory, httpFactory, storageFactory, authFactory } from './factories';
import { AuthService, Browser } from 'ionic-appauth';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: StorageBackend,
      useFactory: storageFactory,
      deps: [Platform]
    },
    {
      provide: Requestor,
      useFactory: httpFactory,
      deps: [Platform, HttpClient]
    },
    {
      provide: Browser,
      useFactory: browserFactory,
      deps: [Platform]
    },
    {
      provide: AuthService,
      useFactory : authFactory,
      deps: [Platform, NgZone, Requestor, Browser, StorageBackend]
    }
  ]
})
export class AuthModule {
}
