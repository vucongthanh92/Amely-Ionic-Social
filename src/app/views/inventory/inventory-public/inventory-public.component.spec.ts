import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryPublicComponent } from './inventory-public.component';

describe('InventoryPublicComponent', () => {
  let component: InventoryPublicComponent;
  let fixture: ComponentFixture<InventoryPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
