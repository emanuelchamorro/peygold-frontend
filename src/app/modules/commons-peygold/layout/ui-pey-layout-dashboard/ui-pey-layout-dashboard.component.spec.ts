import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UIPeyLayoutComponent } from './ui-pey-layout-dashboard.component';

describe('UiPeyLayoutComponent', () => {
  let component: UIPeyLayoutComponent;
  let fixture: ComponentFixture<UIPeyLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UIPeyLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UIPeyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
