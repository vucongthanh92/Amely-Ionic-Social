import { Component, OnInit } from '@angular/core';

import { Platform } from 'ionic-angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  search: string = "peoples";
  isIos: boolean = false;
  constructor(platform: Platform) {
    this.isIos = platform.is('ios');
  }

  ngOnInit() {
  }

}
