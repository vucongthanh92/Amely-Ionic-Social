import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPayMethodComponent } from './quick-pay-method.component';

describe('QuickPayMethodComponent', () => {
  let component: QuickPayMethodComponent;
  let fixture: ComponentFixture<QuickPayMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickPayMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickPayMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
