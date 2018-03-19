import { HistoryOrderComponent } from './../../../modules/history/history-order/history-order.component';
import { NavController, App } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-menu',
  templateUrl: './shopping-menu.component.html'
})
export class ShoppingMenuComponent implements OnInit {

  constructor(private nav: NavController, private appCtrl: App) { }

  ngOnInit() {
  }


  historyOrder() {
    this.appCtrl.getRootNav().push(HistoryOrderComponent);
    this.nav.pop();
  }
}
