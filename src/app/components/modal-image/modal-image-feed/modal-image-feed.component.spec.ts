import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImageFeedComponent } from './modal-image-feed.component';

describe('ModalImageFeedComponent', () => {
  let component: ModalImageFeedComponent;
  let fixture: ComponentFixture<ModalImageFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalImageFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalImageFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
