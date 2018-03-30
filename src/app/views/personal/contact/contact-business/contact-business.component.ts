import { CustomService } from './../../../../services/custom.service';
import { Business } from './../../../../api/models/business';
import { BusinessService } from './../../../../services/business.service';
import { User } from './../../../../api/models/user';
import { Component, OnInit } from '@angular/core';
import { App, NavController, LoadingController } from 'ionic-angular';
import { BusinessComponent } from '../../../../components/business/business.component';

@Component({
  selector: 'app-contact-business',
  templateUrl: './contact-business.component.html'
})
export class ContactBusinessComponent implements OnInit {
  public business_pages: Array<Business>;
  public users: Array<User>;
  public user_current: User;
  constructor(public nav: NavController, public appCtrl: App, private service: BusinessService, private customService: CustomService, 
    public loadingCtrl: LoadingController) {
    this.user_current = JSON.parse(localStorage.getItem("loggin_user"));
  }

  ngOnInit() {
    this.loadData(5)
  }

  loadData(retry) {
    if (retry == 0) {
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });

    loading.present();
    this.service.getBusinessPages(this.user_current.guid, 0, 9999).subscribe(data => {
      if (data.pages instanceof Array) {
        loading.dismiss();
        this.business_pages = data.pages;
        this.users = data.users;
      }
    }, err => this.loadData(--retry))
  }
  goToPage(business: Business) {
    this.appCtrl.getRootNav().push(BusinessComponent, { guid: business.guid });
  }
}
