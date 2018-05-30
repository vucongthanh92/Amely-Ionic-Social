import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotVertifyComponent } from './forgot-vertify.component';

describe('ForgotVertifyComponent', () => {
  let component: ForgotVertifyComponent;
  let fixture: ComponentFixture<ForgotVertifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotVertifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotVertifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
