import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UIPeyMainMenuComponent } from './ui-pey-main-menu.component';

describe('UIPeyMainMenuComponent', () => {
  let component: UIPeyMainMenuComponent;
  let fixture: ComponentFixture<UIPeyMainMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UIPeyMainMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UIPeyMainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
