import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  shopTab = 'products';
  productsPage = true;
  infoPage = false;

  goToPage(value) {
    switch (value) {
      case 'products':
        this.productsPage = true;
        this.infoPage = false;
        break;
      case 'info':
        this.productsPage = false;
        this.infoPage = true;
        break;
      default:
        break;
    }
  }
}
