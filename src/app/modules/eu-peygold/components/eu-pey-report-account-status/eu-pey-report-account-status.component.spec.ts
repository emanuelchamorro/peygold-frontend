import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyReportAccountStatusComponent } from './eu-pey-report-account-status.component';

describe('EuPeyReportAccountStatusComponent', () => {
  let component: EuPeyReportAccountStatusComponent;
  let fixture: ComponentFixture<EuPeyReportAccountStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyReportAccountStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyReportAccountStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
