import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearByUserSettingComponent } from './near-by-user-setting.component';

describe('NearByUserSettingComponent', () => {
  let component: NearByUserSettingComponent;
  let fixture: ComponentFixture<NearByUserSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearByUserSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearByUserSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
