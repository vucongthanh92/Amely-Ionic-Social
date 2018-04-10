import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'app-quick-pay-list-item',
  templateUrl: './quick-pay-list-item.component.html'
})
export class QuickPayListItemComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  showInventoryItem() {

  }
}
