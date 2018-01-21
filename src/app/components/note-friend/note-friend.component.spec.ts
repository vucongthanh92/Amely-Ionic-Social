import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteFriendComponent } from './note-friend.component';

describe('NoteFriendComponent', () => {
  let component: NoteFriendComponent;
  let fixture: ComponentFixture<NoteFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
