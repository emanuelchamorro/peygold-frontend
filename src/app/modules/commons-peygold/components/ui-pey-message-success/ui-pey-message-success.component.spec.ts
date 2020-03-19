import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPeyMessageSuccessComponent } from './ui-pey-message-success.component';

describe('UiPeyMessageSuccessComponent', () => {
  let component: UiPeyMessageSuccessComponent;
  let fixture: ComponentFixture<UiPeyMessageSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiPeyMessageSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiPeyMessageSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
