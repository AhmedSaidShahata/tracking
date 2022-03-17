import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelAssetComponent } from './excel-asset.component';

describe('ExcelAssetComponent', () => {
  let component: ExcelAssetComponent;
  let fixture: ComponentFixture<ExcelAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
