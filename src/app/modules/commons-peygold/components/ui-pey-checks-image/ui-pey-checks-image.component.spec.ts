import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPeyChecksImageComponent } from './ui-pey-checks-image.component';

describe('UiPeyChecksImageComponent', () => {
  let component: UiPeyChecksImageComponent;
  let fixture: ComponentFixture<UiPeyChecksImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiPeyChecksImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiPeyChecksImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
