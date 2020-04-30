import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPeyHelpLayoutComponent } from './ui-pey-help-layout.component';

describe('UiPeyHelpLayoutComponent', () => {
  let component: UiPeyHelpLayoutComponent;
  let fixture: ComponentFixture<UiPeyHelpLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiPeyHelpLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiPeyHelpLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
