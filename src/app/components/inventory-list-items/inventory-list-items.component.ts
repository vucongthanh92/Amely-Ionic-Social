import { InvenroyItemsComponent } from './../invenroy-items/invenroy-items.component';
import { Component, OnInit, Input } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { App } from 'ionic-angular/components/app/app';

@Component({
  selector: 'app-inventory-list-items',
  templateUrl: './inventory-list-items.component.html'
})
export class InventoryListItemsComponent implements OnInit {

  @Input('inventory_type') inventory_type: any;

  types: Array<{ title: string,image: string }>;

  constructor(public nav: NavController, public appCtrl: App) { }

  ngOnInit() {
    console.log(this.inventory_type);
    this.initTypes();
  }

  initTypes(){
    this.types=[
      { title: 'Mới nhập', image: 'assets/imgs/ic_inventory_new.png'},
      { title: 'Yêu thích', image: 'assets/imgs/ic_inventory_like.png'},
      { title: 'Muốn cho đi', image: 'assets/imgs/ic_inventory_wanna_send.png'},
      { title: 'Có hạn dùng', image: 'assets/imgs/ic_inventory_expired.png'},
      { title: 'Không hạn dùng', image: 'assets/imgs/ic_inventory_no_expired.png'},
      { title: 'E-Voucher', image: 'assets/imgs/ic_inventory_voucher.png'},
      { title: 'E-Ticket', image: 'assets/imgs/ic_inventory_ticket.png'},
    ]
  }

  goToPage(value) {
    switch (value) {
      case 'items':
        this.appCtrl.getRootNav().push(InvenroyItemsComponent);
        break;
      case 'default':
        break;
    }
  }

}
