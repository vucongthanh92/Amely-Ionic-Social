import { Param_create_offer } from './../api/models/param-_create-_offer';
import { ApiService } from './../api/services/api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class OfferService {

  constructor(
    private api: ApiService
  ) { }

  createCounterOffer(obj) {
    return this.api.createCounterOffer(obj);
  }

  createOffer(obj: Param_create_offer) {

    // "giveaway_approval": true,
    // "limit_counter": 0,
    // "random_expiration": false,
    return this.api.createOffer(obj);
  }

  getOffer(offer_guid) {
    return this.api.getOffer(offer_guid);
  }
  
  getListCounter() {
    return this.api.getCounterOffers({});
  }

  rejectCounter(counter_offer_guid) {
    return this.api.deleteCounterOffer(counter_offer_guid);
  }

  agreeCounter(offer_guid, counter_offer_guid) {
    return this.api.updateOffer({ offer_guid: offer_guid, counter_offer_guid: counter_offer_guid })
  }

  delete(offer_guid) {
    return this.api.deleteOffer(offer_guid);
  }
}
