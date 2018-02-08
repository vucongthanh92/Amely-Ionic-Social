import { ApiService } from './../api/services/api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class BusinessService {

  constructor(private api: ApiService) { }

  getBusinessPages(owner_guid: number, offset: number, limit: number) {
    return this.api.getBusinessPages({ owner_guid: owner_guid, offset: offset, limit: limit });
  }

  getBusinessPage(guid:number){
    return this.api.getBusinessPage(guid);
  }
}
