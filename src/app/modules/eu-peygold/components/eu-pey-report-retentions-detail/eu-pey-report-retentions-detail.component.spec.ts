import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyReportRetentionsDetailComponent } from './eu-pey-report-retentions-detail.component';

describe('EuPeyReportRetentionsDetailComponent', () => {
  let component: EuPeyReportRetentionsDetailComponent;
  let fixture: ComponentFixture<EuPeyReportRetentionsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyReportRetentionsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyReportRetentionsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
