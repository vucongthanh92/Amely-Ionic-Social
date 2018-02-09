import { User } from './../api/models/user';
import { Injectable } from '@angular/core';
import { ApiService } from './../api/services/api.service';
import { Group } from '../api/models/group';

@Injectable()
export class GroupService {

  public groups_contact:Array<Group>;
  public groups_user:Array<User>;

  constructor(private apiService: ApiService) { }

  getGroups(ownerGuid) {
    return this.apiService.getGroups(ownerGuid);
  }

  getGroup(groupGuid) {
    return this.apiService.getGroup(groupGuid);
  }

  putGroup(name: string, description: string, privacy: string, member_invite: string, membership: string, has_inventory: string, members: number[]) {
    return this.apiService.createGroup({ name: name, description: description, privacy: privacy, member_invite: member_invite, 
      membership: membership, members: members, has_inventory: has_inventory });
  }
}
