import { Injectable } from '@angular/core';
import { ApiService } from './../api/services/api.service';

@Injectable()
export class GroupService {


  constructor(private apiService: ApiService) { }

  getGroups(ownerGuid) {
    return this.apiService.getGroups(ownerGuid);
  }

  getGroup(groupGuid) {
    return this.apiService.getGroup(groupGuid);
  }

  putGroup(name: string, description: string, privacy: string, member_invite: string, membership: string, has_inventory: string, members: number[]) {
    this.apiService.createGroup({ name: name, description: description, privacy: privacy, member_invite: member_invite, 
      membership: membership, members: members, has_inventory: has_inventory });
  }

}
