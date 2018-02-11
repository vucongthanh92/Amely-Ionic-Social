import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosenItemComponent } from './chosen-item.component';

describe('ChosenItemComponent', () => {
  let component: ChosenItemComponent;
  let fixture: ComponentFixture<ChosenItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChosenItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChosenItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
