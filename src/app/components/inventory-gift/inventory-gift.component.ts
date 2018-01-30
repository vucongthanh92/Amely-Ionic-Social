import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'app-inventory-gift',
  templateUrl: './inventory-gift.component.html'
})
export class InventoryGiftComponent implements OnInit {
  @ViewChild(Slides) slides: Slides;
  constructor() { }

  ngOnInit() {
  }

  goSlideNext() {
    this.slides.slideNext();
  }
  goSlidePrevious() {
    this.slides.slidePrev();
  }
  slideChanged() {
    let view = this.slides.getActiveIndex();
    console.log("Current index is", view);
  }
}
