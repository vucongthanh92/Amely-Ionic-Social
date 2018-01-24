import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform, MenuController } from 'ionic-angular';
import { RegisterComponent } from "../register/register.component";
import { SocialComponent } from '../../views/social/social.component';
import { ToastController } from 'ionic-angular';
import { MainMenuComponent } from '../../layout/main-menu/main-menu.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

  user = { username: '', password: '' };

  constructor(
    private authenticationService: AuthenticationService, 
    public nav: NavController,
    private toastCtrl: ToastController,
    public menuCtrl: MenuController
  ) { 
  }

  ngOnInit() {
  }

  onLogin() {
    this.authenticationService.login(this.user.username, this.user.password).subscribe(resp => {
      if (resp.status == false) {
        const toast = this.toastCtrl.create({
          message: 'Đăng nhập thất bại!',
          position: "bottom",
          duration: 3000
        });

        toast.present();
      } else {
        this.authenticationService.setSession(resp);
        // if () {
          this.nav.setRoot(MainMenuComponent);
        // }
      }
    });
  }

  onRegister(){
    this.nav.push(RegisterComponent);
  }
}
