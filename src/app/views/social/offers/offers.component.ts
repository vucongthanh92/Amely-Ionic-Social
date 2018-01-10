import { Component, OnInit, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html'
})
export class OffersComponent implements OnInit {

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
