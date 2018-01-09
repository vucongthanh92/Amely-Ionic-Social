import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingSecurityComponent } from './setting-security.component';

describe('SettingSecurityComponent', () => {
  let component: SettingSecurityComponent;
  let fixture: ComponentFixture<SettingSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingSecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
