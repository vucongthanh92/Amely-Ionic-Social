import { Component, OnInit, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html'
})
export class OffersComponent implements OnInit {

  @ViewChild('mySlider') slider: Slides;
  offersTab = 'myself';
  
  constructor() { 

  }

  ngOnInit() {
  }

  myselfPage = true;
  pendingPage = false;
  searchPage = false;

  goToPage(value) {
    switch (value) {
      case 'myself':
        this.myselfPage = true;
        this.pendingPage = false;
        this.searchPage = false;
        break;
      case 'pending':
        this.myselfPage = false;
        this.pendingPage = true;
        this.searchPage = false;
        break;
      case 'search':
        this.myselfPage = false;
        this.pendingPage = false;
        this.searchPage = true;
        break;
      default:
        break;
    }
  }
}
