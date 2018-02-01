import { Injectable } from '@angular/core';
import { ApiService } from './../api/services/api.service';

@Injectable()
export class GroupService {
  

  constructor(private apiService: ApiService) { }

  getGroups(ownerGuid) {
    return this.apiService.getGroups(ownerGuid);
  }

  getGroup(groupGuid){
    return this.apiService.getGroup(groupGuid);
  }

}
