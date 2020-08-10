import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPeyBarNotificationsComponent } from './ui-pey-bar-notifications.component';

describe('UiPeyBarNotificationsComponent', () => {
  let component: UiPeyBarNotificationsComponent;
  let fixture: ComponentFixture<UiPeyBarNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiPeyBarNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiPeyBarNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
