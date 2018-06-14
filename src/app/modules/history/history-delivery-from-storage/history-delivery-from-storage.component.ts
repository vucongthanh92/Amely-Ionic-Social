import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HistoryDeliveryOrderService } from '../../../services/history-delivery-order.service';
import { CustomService } from '../../../services/custom.service';
import { User } from '../../../api/models';

@Component({
  selector: 'app-history-delivery-from-storage',
  templateUrl: './history-delivery-from-storage.component.html'
})
export class HistoryDeliveryFromStorageComponent implements OnInit {
  guid: number;
  deliveryOrder: any;
  public userCurrent: User;
  constructor(private nav: NavController, private navParams: NavParams, private historyDeliveryOrder: HistoryDeliveryOrderService, 
    public customService: CustomService) {
    this.guid = this.navParams.get('guid');
    this.historyDeliveryOrder.historyDeliveryOrder(this.guid).subscribe(data => {
      this.deliveryOrder = data;
      console.log(this.deliveryOrder);
      
    });
   }

  ngOnInit() {
    this.userCurrent = this.customService.user_current;
    console.log(this.userCurrent);
    
  }

  dismiss() {
    this.nav.pop();
  }

  formatTotalPrice() {
    return this.customService.formatCurrency(this.deliveryOrder.shipping_fee + "", this.userCurrent.usercurrency)
  }
}
