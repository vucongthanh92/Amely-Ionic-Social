import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesAllComponent } from './categories-all.component';

describe('CategoriesAllComponent', () => {
  let component: CategoriesAllComponent;
  let fixture: ComponentFixture<CategoriesAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
