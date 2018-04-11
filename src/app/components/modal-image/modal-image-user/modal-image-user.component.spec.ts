import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImageUserComponent } from './modal-image-user.component';

describe('ModalImageUserComponent', () => {
  let component: ModalImageUserComponent;
  let fixture: ComponentFixture<ModalImageUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalImageUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalImageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
