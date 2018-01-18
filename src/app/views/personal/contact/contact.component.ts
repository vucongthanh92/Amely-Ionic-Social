import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { Slides, MenuController, NavController } from 'ionic-angular';
import { ContactUsersComponent } from './contact-users/contact-users.component';
import { ContactGroupsComponent } from './contact-groups/contact-groups.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
  usersPage = true;
  groupsPage = false;
  businessPage = false;
  contactTab = 'user';
  @ViewChild('mySlider') slider: Slides;
  currentIndex = 0;
  constructor(public menuCtrl: MenuController, public nav: NavController) { 
    this.currentIndex = 0;

  }

  ngOnInit() {
  }

  slideChanged() {
    this.currentIndex = this.slider.realIndex;
  }

  goToSlide(index) {
    this.slider.slideTo(index, 500);
  }

  goToPage(value) {
    switch (value) {
      case 'user':
        this.usersPage = true;
        this.groupsPage = false;
        this.businessPage = false;
        break;
      case 'group':
        this.usersPage = false;
        this.groupsPage = true;
        this.businessPage = false;
        break;
      case 'business':
        this.usersPage = false;
        this.groupsPage = false;
        this.businessPage = true;
        break;
      default:
        break;
    }
  }
}
