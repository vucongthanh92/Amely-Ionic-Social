import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMenuComponent } from './event-menu.component';

describe('EventMenuComponent', () => {
  let component: EventMenuComponent;
  let fixture: ComponentFixture<EventMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
