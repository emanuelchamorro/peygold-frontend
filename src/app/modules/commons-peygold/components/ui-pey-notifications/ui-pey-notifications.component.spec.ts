import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPeyNotificationsComponent } from './ui-pey-notifications.component';

describe('UiPeyNotificationsComponent', () => {
  let component: UiPeyNotificationsComponent;
  let fixture: ComponentFixture<UiPeyNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiPeyNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiPeyNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
