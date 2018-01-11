import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsFriendlyComponent } from './shops-friendly.component';

describe('ShopsFriendlyComponent', () => {
  let component: ShopsFriendlyComponent;
  let fixture: ComponentFixture<ShopsFriendlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopsFriendlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopsFriendlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
