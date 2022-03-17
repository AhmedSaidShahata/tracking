import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelEmployeeComponent } from './excel-employee.component';

describe('ExcelEmployeeComponent', () => {
  let component: ExcelEmployeeComponent;
  let fixture: ComponentFixture<ExcelEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
