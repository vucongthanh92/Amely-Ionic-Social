import { ApiService } from './../api/services/api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {

  constructor(private api: ApiService) { }

  searchValues(content: string) {
    return this.api.search(content);
  }
}
