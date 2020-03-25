import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyReportShowAccountStatusComponent } from './sc-pey-report-show-account-status.component';

describe('ScPeyReportShowAccountStatusComponent', () => {
  let component: ScPeyReportShowAccountStatusComponent;
  let fixture: ComponentFixture<ScPeyReportShowAccountStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyReportShowAccountStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyReportShowAccountStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
