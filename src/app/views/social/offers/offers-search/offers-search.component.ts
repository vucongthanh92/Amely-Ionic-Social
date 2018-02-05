import { OffersService } from './../../../../services/offers.service';
import { Offer } from './../../../../api/models/offer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers-search',
  templateUrl: './offers-search.component.html'
})
export class OffersSearchComponent implements OnInit {
  public offers: Array<Offer>;
  constructor(private offersServie: OffersService) { }

  ngOnInit() {
    this.offersServie.getOffers(0, 9999, 'friends').subscribe(data => {
      if (data instanceof Array) {
        this.offers = data;
      }
    })
  }

}
