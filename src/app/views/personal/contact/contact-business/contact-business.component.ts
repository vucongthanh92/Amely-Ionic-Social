import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { BusinessComponent } from '../../../../components/business/business.component';

@Component({
  selector: 'app-contact-business',
  templateUrl: './contact-business.component.html'
})
export class ContactBusinessComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) {}

  ngOnInit() {
  }

  goToPage() {
  	this.appCtrl.getRootNav().push(BusinessComponent);
  }
}
