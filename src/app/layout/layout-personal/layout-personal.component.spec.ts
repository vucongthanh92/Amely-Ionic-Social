import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPersonalComponent } from './layout-personal.component';

describe('LayoutPersonalComponent', () => {
  let component: LayoutPersonalComponent;
  let fixture: ComponentFixture<LayoutPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
