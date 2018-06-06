import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotChangePassComponent } from './forgot-change-pass.component';

describe('ForgotChangePassComponent', () => {
  let component: ForgotChangePassComponent;
  let fixture: ComponentFixture<ForgotChangePassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotChangePassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotChangePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
