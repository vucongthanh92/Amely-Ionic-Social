import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsGuestComponent } from './events-guest.component';

describe('EventsGuestComponent', () => {
  let component: EventsGuestComponent;
  let fixture: ComponentFixture<EventsGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
