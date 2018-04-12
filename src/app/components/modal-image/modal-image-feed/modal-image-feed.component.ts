import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParams, ViewController, Slides, Events } from 'ionic-angular';

@Component({
  selector: 'app-modal-image-feed',
  templateUrl: './modal-image-feed.component.html'
})
export class ModalImageFeedComponent implements OnInit {
  urlImage: string[];
  description: string;
  position: number; @ViewChild(Slides) slides: Slides;

  constructor(
    private navParams: NavParams,
    public viewCtrl: ViewController,
    public events: Events
  ) { 
    this.urlImage = this.navParams.get('urlImage');
    this.position = this.navParams.get('position');
    
    this.description = this.navParams.get('description');
    if (this.description == '_=-_tln$@ttonh!i~tki^abg*la_0@896428_=-!75@-=_=-ahihi=))gerrard') {
      this.description = 'Đã thay đổi ảnh đại diện'
    } else if (this.description == '_=-_tln$@ttonh!i~tki^abg*la_0@896428_=-!75@-=_=-ahihi=))amen') {
      this.description = 'Đã thay đổi ảnh bìa'
    }
  }

  ngOnInit() {
  }
  

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
