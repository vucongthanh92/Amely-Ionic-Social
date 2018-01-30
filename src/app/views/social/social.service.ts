import { Injectable } from '@angular/core';
import { ApiService } from '../../api/services/api.service';

@Injectable()
export class SocialService {

  constructor(private api: ApiService) {
    
  }
}
