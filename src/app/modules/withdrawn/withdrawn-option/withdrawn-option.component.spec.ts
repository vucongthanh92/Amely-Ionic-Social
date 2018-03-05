import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawnOptionComponent } from './withdrawn-option.component';

describe('WithdrawnOptionComponent', () => {
  let component: WithdrawnOptionComponent;
  let fixture: ComponentFixture<WithdrawnOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawnOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawnOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
