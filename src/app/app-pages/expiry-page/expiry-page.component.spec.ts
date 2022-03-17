import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiryPageComponent } from './expiry-page.component';

describe('ExpiryPageComponent', () => {
  let component: ExpiryPageComponent;
  let fixture: ComponentFixture<ExpiryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
