import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearByUserComponent } from './near-by-user.component';

describe('NearByUserComponent', () => {
  let component: NearByUserComponent;
  let fixture: ComponentFixture<NearByUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearByUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
