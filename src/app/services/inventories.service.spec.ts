import { TestBed, inject } from '@angular/core/testing';

import { InventoriesService } from './inventories.service';

describe('InventoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventoriesService]
    });
  });

  it('should be created', inject([InventoriesService], (service: InventoriesService) => {
    expect(service).toBeTruthy();
  }));
});
