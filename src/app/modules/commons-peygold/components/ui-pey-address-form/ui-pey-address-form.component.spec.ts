import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UIPeyAddressFormComponent } from './ui-pey-address-form.component';

describe('UIPeyAddressFormComponent', () => {
  let component: UIPeyAddressFormComponent;
  let fixture: ComponentFixture<UIPeyAddressFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UIPeyAddressFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UIPeyAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
