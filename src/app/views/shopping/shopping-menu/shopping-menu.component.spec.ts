import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingMenuComponent } from './shopping-menu.component';

describe('ShoppingMenuComponent', () => {
  let component: ShoppingMenuComponent;
  let fixture: ComponentFixture<ShoppingMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
