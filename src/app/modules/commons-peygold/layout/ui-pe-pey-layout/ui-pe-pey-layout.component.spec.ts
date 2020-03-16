import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPePeyLayoutComponent } from './ui-pe-pey-layout.component';

describe('UiPePeyLayoutComponent', () => {
  let component: UiPePeyLayoutComponent;
  let fixture: ComponentFixture<UiPePeyLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiPePeyLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiPePeyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
