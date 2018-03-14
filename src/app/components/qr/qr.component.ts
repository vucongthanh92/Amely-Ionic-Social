import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html'
})
export class QrComponent implements OnInit {
  code_qr: string;
  constructor(private navParams: NavParams) {
    this.code_qr = this.navParams.get('code');
  }

  ngOnInit() {
  }

}
