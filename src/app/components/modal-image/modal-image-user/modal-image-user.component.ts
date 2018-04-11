import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'app-modal-image-user',
  templateUrl: './modal-image-user.component.html'
})
export class ModalImageUserComponent implements OnInit {
  urlImage : string;
  constructor(
    private navParams: NavParams,
    public viewCtrl: ViewController,
  ) { 
    this.urlImage = this.navParams.get('urlImage');
  }

  ngOnInit() {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
