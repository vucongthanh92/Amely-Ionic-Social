import { Component, OnInit } from '@angular/core';
import { App, NavController, Refresher } from 'ionic-angular';
import { GiftItemDetailComponent } from '../gift-item-detail/gift-item-detail.component';

@Component({
  selector: 'app-choose-item',
  templateUrl: './choose-item.component.html'
})
export class ChooseItemComponent implements OnInit {

  types: Array<{ title: string, image: string }>;

  constructor(public nav: NavController, public appCtrl: App) {}

  ngOnInit() {
    this.types = [
      { title: 'Mới nhập', image: 'assets/imgs/ic_inventory_new.png' },
      { title: 'Yêu thích', image: 'assets/imgs/ic_inventory_like.png' },
      { title: 'Muốn cho đi', image: 'assets/imgs/ic_inventory_wanna_send.png' },
      { title: 'Có hạn dùng', image: 'assets/imgs/ic_inventory_expired.png' },
      { title: 'Không hạn dùng', image: 'assets/imgs/ic_inventory_no_expired.png' },
      { title: 'E-Voucher', image: 'assets/imgs/ic_inventory_voucher.png' },
      { title: 'E-Ticket', image: 'assets/imgs/ic_inventory_ticket.png' },
    ]
  }

  goToDetail(){
    this.appCtrl.getRootNav().push(GiftItemDetailComponent);
  }
}
