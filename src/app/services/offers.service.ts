import { ApiService } from './../api/services/api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class OffersService {

  constructor(private api: ApiService) { }

  getOffer(offerGuid) {
    return this.api.getOffer(offerGuid);
  }

  getOffers(offset, limit, target) {
    return this.api.getOffers({ offset: offset, limit: limit, target: target });
  }

  getCounterOffers(offset: number, limit: number) {
    return this.api.getCounterOffers({ offset: offset, limit: limit });
  }

  getCounterOffer(guid: number) {
    return this.api.getCounterOffer(guid);
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

  bookmarkOffer(item_guid: number) {
    return this.api.createBookmark({ item_guid: item_guid, bookmark_type: "offer" });
  }

  getBookmarks() {
    return this.api.getBookmarks({ owner_guid: null, bookmark_type: 'offer', offset: 0, limit: 9999 });
  }

  deleteBookmark() {
    return this.api.deleteBookmark('offer');
  }

  deleteCounterOffer(guid) {
    return this.api.deleteCounterOffer(guid);
  }
}
