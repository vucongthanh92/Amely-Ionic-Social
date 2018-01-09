import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPrivateComponent } from './setting-private.component';

describe('SettingPrivateComponent', () => {
  let component: SettingPrivateComponent;
  let fixture: ComponentFixture<SettingPrivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingPrivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
