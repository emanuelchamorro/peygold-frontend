import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyReportAccountStatusComponent } from './sc-pey-report-account-status.component';

describe('ScPeyReportAccountStatusComponent', () => {
  let component: ScPeyReportAccountStatusComponent;
  let fixture: ComponentFixture<ScPeyReportAccountStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyReportAccountStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyReportAccountStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
