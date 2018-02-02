import { AuthenticationService } from './../authentication.service';
import { Component, OnInit, Input } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { RegisterComponent } from "../register/register.component";
import { ToastController } from 'ionic-angular';
import { MainMenuComponent } from '../../layout/main-menu/main-menu.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

  @Input('username') username: string;
  @Input('password') password: string;
 
  constructor(
    private authenticationService: AuthenticationService, 
    public nav: NavController,
    private toastCtrl: ToastController
  ) { 
  }
  
  ngOnInit() {
  }

  onLogin() {
    this.authenticationService.login(this.username, this.password).subscribe(resp => {
      if (resp.status == false) {
        const toast = this.toastCtrl.create({
          message: 'Đăng nhập thất bại!',
          position: "bottom",
          duration: 3000
        });

        toast.present();
      } else {
        this.authenticationService.setSession(resp);
        this.nav.setRoot(MainMenuComponent);
      }
    });
  }

  onRegister(){
    this.nav.push(RegisterComponent);
  }
}
