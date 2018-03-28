import { User } from './../../../api/models/user';
import { Component, OnInit } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { UserComponent } from '../../../components/user/user.component';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

@Component({
  selector: 'app-personal-menu',
  templateUrl: './personal-menu.component.html',
  providers:[
    Contacts
  ]
})

export class PersonalMenuComponent implements OnInit {

  public userCurrent: User;
  constructor(public nav: NavController, private appCtrl: App, private contacts: Contacts) {
    this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));
  }

  ngOnInit() {
  }

  changePage() {
    this.nav.pop();
    this.appCtrl.getRootNav().push(UserComponent, { userGuid: this.userCurrent.guid });
  }

  updateContacts(){
    this.contacts.find(["name", "phoneNumbers"],
      { multiple: true}).then((contacts) => {
        console.log(contacts);
        
        if (contacts.length != 0) {
        
        } else {
        
        }
      });
  }
}
