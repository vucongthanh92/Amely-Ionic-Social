import { HistoryDeliveryDetailComponent } from './../history-delivery-detail/history-delivery-detail.component';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { HistoryService } from './../../../services/history.service';
import { Component, OnInit } from '@angular/core';
import { Delivery_order, Shop } from '../../../api/models';
import { App } from 'ionic-angular';

@Component({
  selector: 'app-history-delivery',
  templateUrl: './history-delivery.component.html'
})
export class HistoryDeliveryComponent implements OnInit {
  dos: Delivery_order[];
  shops: Shop[];

  constructor(private historyService: HistoryService, private appCtrl: App) { }

  ngOnInit() {
    this.historyService.deliveryHistory().subscribe(data => {
      console.log(data);

      this.dos = data.dos;
      this.shops = data.shops;
    })
  }

  convertDate(time) {
    return new Date(time * 1000);
  }

  openDetail(deliveryOrder: Delivery_order) {
    this.appCtrl.getRootNav().push(HistoryDeliveryDetailComponent, { do: deliveryOrder })
  }

  openShop(shop: Shop) {
    // this.appCtrl.getRootNav().push(ShopComponent, { guid: shop.guid })
  }
}
