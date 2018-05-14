import { VerifycodeComponent } from './../verifycode/verifycode.component';
import { CustomService } from './../../services/custom.service';
import { GeolocationService } from './../../services/geolocation.service';
import { AuthenticationService } from './../authentication.service';
import { Component, OnInit, Input } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { RegisterComponent } from "../register/register.component";
import { ToastController } from 'ionic-angular';
import { MainMenuComponent } from '../../layout/main-menu/main-menu.component';
import { Geolocation } from '@ionic-native/geolocation';
import { ApiService } from '../../api/services';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

  @Input('username') username: string = 'quannm';
  @Input('password') password: string = 'Amely123';

  latitude: any;
  longitude: any;
  is_logging: boolean = false;
  loader;

  constructor(
    public geolocationService: GeolocationService,
    public geolocation: Geolocation,
    private authenticationService: AuthenticationService,
    public nav: NavController,
    private toastCtrl: ToastController,
    private api: ApiService,
    private customService: CustomService,
    public loadingCtrl: LoadingController
  ) {
  }

  ngOnInit() {
    let a = '20/3/2014'
    console.log(new Date(a));

  }

  onLogin() {
    this.is_logging = true;
    this.loader = this.loadingCtrl.create();
    this.loader.present();
    this.retryLogin(5);
  }

  setUsername(username) {
    this.username = username.toLowerCase();
  }

  onRegister() {
    // this.nav.push(MapComponent);
    this.nav.push(RegisterComponent);
  }

  retryLogin(retry) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.authenticationService.login(this.username, this.password).subscribe(resp => {
      this.is_logging = false;
      this.loader.dismiss();
      if (resp.status == false) {
        if (resp.validation) {
          let u = resp.validation;
          u.password = this.password;
          this.nav.push(VerifycodeComponent, { user: u });
        } else {
          const toast = this.toastCtrl.create({
            message: 'Đăng nhập thất bại!',
            position: "bottom",
            duration: 3000
          });
          toast.present();
        }
      } else {
        this.retryLoadProfile(5, resp);
      }
    }, err => {
      this.retryLogin(--retry);
    });
  }

  retryLoadProfile(retry, resp) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.api.getProfile({}).subscribe(data => {
      // this.loader.dismiss();
      localStorage.setItem('loggin_user', JSON.stringify(data));
      this.customService.user_current = data;
      this.authenticationService.setSession(resp);
      localStorage.setItem('baer', JSON.stringify(resp));
      this.geolocation.getCurrentPosition().then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        localStorage.setItem("lat", this.latitude);
        localStorage.setItem("lng", this.longitude);
        this.geolocationService.setLocation(this.username, this.latitude, this.longitude);
      }).catch((error) => {
        console.log('Error getting location', error);
      });
      this.nav.setRoot(MainMenuComponent);
    }, err => {
      this.retryLoadProfile(--retry, resp);
    })
  }
}
