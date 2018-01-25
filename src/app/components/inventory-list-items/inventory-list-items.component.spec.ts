import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryListItemsComponent } from './inventory-list-items.component';

describe('InventoryListItemsComponent', () => {
  let component: InventoryListItemsComponent;
  let fixture: ComponentFixture<InventoryListItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryListItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
