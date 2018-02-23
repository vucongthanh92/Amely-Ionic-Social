import { ApiService } from './../api/services/api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class InvitationService {

  constructor(private apiService: ApiService) { }

  getInvatitions() {
    return this.apiService.getInvitations();
  }

  putApproval(invitation_type: string, from_guid: number, to_guid: number) {
    return this.apiService.createApproval({ invitation_type: invitation_type, from_guid: from_guid, to_guid: to_guid });
  }

  deleteApproval(invitation_type: string, from_guid: number, to_guid: number) {
    return this.apiService.deleteApproval({ toGuid: to_guid, invitationType: invitation_type, fromGuid: from_guid });
  }

}
