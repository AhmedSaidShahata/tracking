import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachAssetToEmployeeComponent } from './attach-asset-to-employee.component';

describe('AttachAssetToEmployeeComponent', () => {
  let component: AttachAssetToEmployeeComponent;
  let fixture: ComponentFixture<AttachAssetToEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachAssetToEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachAssetToEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
