import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopFeatureComponent } from './shop-feature.component';

describe('ShopFeatureComponent', () => {
  let component: ShopFeatureComponent;
  let fixture: ComponentFixture<ShopFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
