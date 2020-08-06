import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPePeyLayoutQrComponent } from './ui-pe-pey-layout-qr.component';

describe('UiPePeyLayoutComponent', () => {
  let component: UiPePeyLayoutQrComponent;
  let fixture: ComponentFixture<UiPePeyLayoutQrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiPePeyLayoutQrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiPePeyLayoutQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
