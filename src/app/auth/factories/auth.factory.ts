import { Platform } from '@ionic/angular';
import { StorageBackend, Requestor } from '@openid/appauth';
import { AuthService, Browser, ConsoleLogObserver } from 'ionic-appauth';
import { environment } from 'src/environments/environment';
import { NgZone } from '@angular/core';

export let authFactory = (platform: Platform, ngZone: NgZone,
                          requestor: Requestor, browser: Browser,  storage: StorageBackend) => {

  const authService = new AuthService(browser, storage, requestor);
  authService.authConfig = environment.oidcConfig;

  if (platform.is('cordova')) {
    authService.authConfig.scopes += ' offline_access';
    authService.authConfig.redirect_url = 'com.okta.dev-133320:/callback';
    authService.authConfig.end_session_redirect_url = 'com.okta.dev-133320:/logout';
  }

  if (platform.is('cordova')) {
    (window as any).handleOpenURL = (callbackUrl) => {
      ngZone.run(() => {
        authService.authorizationCallback(callbackUrl);
      });
    };
  }

  authService.addActionObserver(new ConsoleLogObserver());
  return authService;
};
