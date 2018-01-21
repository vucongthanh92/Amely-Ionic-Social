import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryPrivateComponent } from './inventory-private.component';

describe('InventoryPrivateComponent', () => {
  let component: InventoryPrivateComponent;
  let fixture: ComponentFixture<InventoryPrivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryPrivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
