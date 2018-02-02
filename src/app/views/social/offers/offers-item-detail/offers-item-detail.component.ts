import { Offer } from './../../../../api/models/offer';
import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../../../services/offers.service';

@Component({
  selector: 'app-offers-item-detail',
  templateUrl: './offers-item-detail.component.html'
})
export class OffersItemDetailComponent implements OnInit {
  constructor(private offersService: OffersService) { }

  ngOnInit() {
  }

}
