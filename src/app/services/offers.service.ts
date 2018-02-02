import { Injectable } from '@angular/core';
import { ApiService } from '../api/services/api.service';

@Injectable()
export class OffersService {

  constructor(private apiService: ApiService) { }

  getOffer(offerGuid) {
    return this.apiService.getOffer(offerGuid);
  }

  getOffers(offset, limit, target) {
    return this.apiService.getOffers({ offset: offset, limit: limit, target: target });
  }

  getCounterOffers(offset: number, limit: number) {
    return this.apiService.getCounterOffers({ offset: offset, limit: limit });
  }

  getCounterOffer(guid: number) {
    return this.apiService.getCounterOffer(guid);
  }
}
