import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalItemComponent } from './renewal-item.component';

describe('RenewalItemComponent', () => {
  let component: RenewalItemComponent;
  let fixture: ComponentFixture<RenewalItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
