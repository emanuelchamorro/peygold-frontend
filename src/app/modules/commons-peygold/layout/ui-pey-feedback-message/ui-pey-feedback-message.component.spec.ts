import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UIPeyFeedbackMessageComponent } from './ui-pey-feedback-message.component';

describe('UIPeyFeedbackMessageComponent', () => {
  let component: UIPeyFeedbackMessageComponent;
  let fixture: ComponentFixture<UIPeyFeedbackMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UIPeyFeedbackMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UIPeyFeedbackMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
