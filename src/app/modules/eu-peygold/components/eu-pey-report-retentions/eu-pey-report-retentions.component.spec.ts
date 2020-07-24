import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyReportRetentionsComponent } from './eu-pey-report-retentions.component';

describe('EuPeyReportRetentionsComponent', () => {
  let component: EuPeyReportRetentionsComponent;
  let fixture: ComponentFixture<EuPeyReportRetentionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyReportRetentionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyReportRetentionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
