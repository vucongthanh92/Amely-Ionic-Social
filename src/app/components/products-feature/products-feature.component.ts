import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-products-feature',
  templateUrl: './products-feature.component.html'
})

export class ProductsFeatureComponent implements OnInit {
  @ViewChild('mySlider') mySlider: any;
  constructor() {
  }

  ngOnInit() {
  }

}
