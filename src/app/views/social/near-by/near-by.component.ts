import { Component, OnInit, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'app-near-by',
  templateUrl: './near-by.component.html'
})
export class NearByComponent implements OnInit {

  @ViewChild('mySlider') slider: Slides;
  currentIndex = 0;
  constructor() { 
    this.currentIndex = 0;
  }

  ngOnInit() {
  }
  nearbyTab = 'user';
  userPage = true;
  shopPage = false;

  goToPage(value) {
    switch (value) {
      case 'user':
        this.userPage = true;
        this.shopPage = false;
        break;
      case 'shop':
        this.userPage = false;
        this.shopPage = true;
        break;
      default:
        break;
    }
  }
}
