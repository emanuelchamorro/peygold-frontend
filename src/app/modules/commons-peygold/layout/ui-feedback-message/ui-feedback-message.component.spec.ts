import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UIFeedbackMessageComponent } from './ui-feedback-message.component';

describe('UIFeedbackMessageComponent', () => {
  let component: UIFeedbackMessageComponent;
  let fixture: ComponentFixture<UIFeedbackMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UIFeedbackMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UIFeedbackMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
