import { Business } from './../../../../api/models/business';
import { BusinessService } from './../../../../services/business.service';
import { User } from './../../../../api/models/user';
import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { BusinessComponent } from '../../../../components/business/business.component';

@Component({
  selector: 'app-contact-business',
  templateUrl: './contact-business.component.html'
})
export class ContactBusinessComponent implements OnInit {
  public business_pages: Array<Business>;
  public users: Array<User>;
  public user_current: User;
  constructor(public nav: NavController, public appCtrl: App, private service: BusinessService) {
    this.user_current = JSON.parse(localStorage.getItem("loggin_user"));
  }

  ngOnInit() {
    this.service.getBusinessPages(this.user_current.guid, 0, 9999).subscribe(data => {
      if (data.pages instanceof Array) {
        this.business_pages = data.pages;
        this.users = data.users;
      }
    })
  }

  goToPage(business: Business) {
    this.appCtrl.getRootNav().push(BusinessComponent, { guid: business.guid });
  }
}
