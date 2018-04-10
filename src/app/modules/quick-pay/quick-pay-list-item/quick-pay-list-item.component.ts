import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { QuickPayRedeemComponent } from '../quick-pay-redeem/quick-pay-redeem.component';
import { QuickPayMethodComponent } from '../quick-pay-method/quick-pay-method.component';

@Component({
  selector: 'app-quick-pay-list-item',
  templateUrl: './quick-pay-list-item.component.html'
})
export class QuickPayListItemComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private nav: NavController) { }

  ngOnInit() {
  }
  showInventoryItem() {
    let profileModal = this.modalCtrl.create(QuickPayRedeemComponent);
    profileModal.present();
  }
  next() {
    this.nav.push(QuickPayMethodComponent);
  }
}
