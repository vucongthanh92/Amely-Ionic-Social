import { OffersService } from './../../../../services/offers.service';
import { Component, OnInit } from '@angular/core';
import { CounterOffer } from '../../../../api/models/counter-offer';

@Component({
  selector: 'app-offers-pending',
  templateUrl: './offers-pending.component.html'
})
export class OffersPendingComponent implements OnInit {
  counterOffers: Array<CounterOffer> = [];
  constructor(private offerService: OffersService) { }

  ngOnInit() {
    this.offerService.getCounterOffers(0, 9999).subscribe(data => {
      if (data instanceof Array) {
        this.counterOffers = data;
      }
    });
  }

  getTimeString(time : number){
    console.log(new Date(time*1000));
    
    return new Date(time*1000);
  }
}
