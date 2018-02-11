import { Param_create_offer } from './../api/models/param-_create-_offer';
import { ApiService } from './../api/services/api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class OfferService {

  constructor(
    private api: ApiService
  ) { }

  createOffer(obj: Param_create_offer) {

    // "giveaway_approval": true,
    // "limit_counter": 0,
    // "random_expiration": false,
   return this.api.createOffer(obj);
  }

}
