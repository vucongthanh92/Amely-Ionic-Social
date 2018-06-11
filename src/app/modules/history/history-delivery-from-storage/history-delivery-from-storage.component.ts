import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'app-history-delivery-from-storage',
  templateUrl: './history-delivery-from-storage.component.html'
})
export class HistoryDeliveryFromStorageComponent implements OnInit {

  constructor(private nav: NavController, private navParam: NavParams) {

   }

  ngOnInit() {
  }

  dismiss() {
    this.nav.pop();
  }
}
