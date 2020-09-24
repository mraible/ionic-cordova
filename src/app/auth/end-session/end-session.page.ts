import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'ionic-appauth';

@Component({
  template: '<p style="margin-left: 10px">Signing out...</p>'
})
export class EndSessionPage implements OnInit {

  constructor(
    private auth: AuthService,
    private navCtrl: NavController,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.auth.endSessionCallback();
    this.navCtrl.navigateRoot('login');
  }

}
