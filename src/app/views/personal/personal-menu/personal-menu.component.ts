import { UserService } from './../../../services/user.service';
import { CustomService } from './../../../services/custom.service';
import { User } from './../../../api/models/user';
import { Component, OnInit } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { UserComponent } from '../../../components/user/user.component';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

@Component({
  selector: 'app-personal-menu',
  templateUrl: './personal-menu.component.html',
  providers: [
    Contacts
  ]
})

export class PersonalMenuComponent implements OnInit {
  public userCurrent: User;
  constructor(public nav: NavController, private appCtrl: App, private contacts: Contacts, private customService: CustomService, private userService: UserService) {
    this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));
  }

  ngOnInit() {
  }

  changePage() {
    this.nav.pop();
    this.appCtrl.getRootNav().push(UserComponent, { userGuid: this.userCurrent.guid });
  }

  //   [{
  //   "_objectInstance":
  //     {
  //       "id": 1, "rawId": null, "displayName": null,
  //       "name": { "givenName": null, "honorificSuffix": null, "formatted": "Phuc", "middleName": null, "familyName": "Phuc", "honorificPrefix": null },
  //       "nickname": null,
  //       "phoneNumbers": [{ "value": "0120 4439003", "pref": false, "id": 0, "type": "home" }],
  //       "emails": null, "addresses": null, "ims": null, "organizations": null, "birthday": null, "note": null, "photos": null, "categories": null, "urls": null
  //     },
  //   "rawId": null
  // },
  // {
  //   "_objectInstance":
  //     {
  //       "id": 2, "rawId": null, "displayName": null,
  //       "name": { "givenName": "vi", "honorificSuffix": null, "formatted": "pham vi", "middleName": null, "familyName": "pham", "honorificPrefix": null },
  //       "nickname": null,
  //       "phoneNumbers": [{ "value": "098 7476321", "pref": false, "id": 0, "type": "home" }],
  //       "emails": null, "addresses": null, "ims": null, "organizations": null, "birthday": null, "note": null, "photos": null, "categories": null, "urls": null
  //     }
  //   , "rawId": null
  // }];
  updateContacts() {
    this.contacts.find(["name", "phoneNumbers"],
      { multiple: true }).then((contacts) => {
        if (contacts.length != 0) {
          const phoneNumbers: Array<string> = [];
          contacts.forEach(e => {
            phoneNumbers.push(e.phoneNumbers[0].value.replace(/\s/g, ''));
          });
          console.log(phoneNumbers);

          this.userService.updateContact(phoneNumbers).subscribe(data => {
            if (data.status) {
              this.customService.toastMessage('Đã gửi lời mời kết bạn đến tất cả danh sách số điện thoại trong danh bạ', 'bottom', 5000);
            } else this.customService.toastMessage('Cập nhật danh bạ thất bại', 'bottom', 3000);
          })
        } else {
          this.customService.toastMessage('Danh bạ rỗng', 'bottom', 3000);
        }
      });
  }
}
