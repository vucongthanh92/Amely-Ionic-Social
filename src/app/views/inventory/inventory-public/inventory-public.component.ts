import { Component, OnInit, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'app-inventory-public',
  templateUrl: './inventory-public.component.html',
})
export class InventoryPublicComponent implements OnInit {

  @ViewChild('mySlider') slider: Slides;
  currentIndex = 0;
  constructor() { 
    this.currentIndex = 0;
  }

  ngOnInit() {
  }
  slideChanged() {
    this.currentIndex = this.slider.realIndex;
  }

  goToSlide(index) {
    this.slider.slideTo(index, 500);
  }

}
