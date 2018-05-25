import { SearchComponent } from './../../components/search/search.component';
import { CustomService } from './../../services/custom.service';
import { Component, OnInit, Input } from '@angular/core';
import { MenuController, NavController, PopoverController, NavParams, App } from 'ionic-angular';
import { ContactComponent } from './contact/contact.component';
import { MessagesComponent } from './messages/messages.component';
import { NotificationComponent } from './notification/notification.component';
import { PersonalMenuComponent } from './personal-menu/personal-menu.component';
@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html'
})

export class PersonalComponent implements OnInit {

  @Input('search') search: string;
  isOn: boolean;
  tabActive = true;
  tab1Root = ContactComponent;
  tab2Root = MessagesComponent;
  tab3Root = NotificationComponent;
  public device_screen: string;

  constructor(
    public popoverCtrl: PopoverController,
    public menuCtrl: MenuController,
    public customService: CustomService,
    public nav: NavController, public appCtrl: App, public navParams: NavParams) {
      this.device_screen = customService.checkDevices();
    }

  ngOnInit() {
  }

  openPopover(myEvent) {
    let popover = this.popoverCtrl.create(PersonalMenuComponent);
    popover.present({
      ev: myEvent
    });
  }

  toggleDetails() {
    this.isOn = !this.isOn;
    if (!this.isOn) {
      if (this.search != undefined && this.search.length >= 3) {
        // this.customService.goToPageSearch(this.search, this.nav);
        this.nav.push(SearchComponent, { param: this.search, service: this })
      } else {
        this.customService.toastMessage('Tìm kiếm phải lớn hơn 3 ký tự', 'bottom', 3000)
      }
    }
  }

}
