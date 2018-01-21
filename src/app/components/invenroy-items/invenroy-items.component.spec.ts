import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvenroyItemsComponent } from './invenroy-items.component';

describe('InvenroyItemsComponent', () => {
  let component: InvenroyItemsComponent;
  let fixture: ComponentFixture<InvenroyItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvenroyItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvenroyItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
