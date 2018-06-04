import { Component, OnInit, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { NearByUserComponent } from './near-by-user/near-by-user.component';
import { NearByShopComponent } from './near-by-shop/near-by-shop.component';
import { CustomService } from '../../../services/custom.service';

@Component({
  selector: 'app-near-by',
  templateUrl: './near-by.component.html'
})
export class NearByComponent implements OnInit {
  public device_screen: string;
  @ViewChild('mySlider') slider: Slides;
  currentIndex = 0;

  tab1Root = NearByUserComponent;
  tab2Root = NearByShopComponent;

  constructor(
    public customService: CustomService
  ) {
    this.currentIndex = 0;
    this.device_screen = customService.checkDevices();  
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
