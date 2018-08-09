import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSnapshotDetailComponent } from './product-snapshot-detail.component';

describe('ProductSnapshotDetailComponent', () => {
  let component: ProductSnapshotDetailComponent;
  let fixture: ComponentFixture<ProductSnapshotDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSnapshotDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSnapshotDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
