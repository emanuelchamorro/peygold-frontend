import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyReportRetentionDetailComponent } from './sc-pey-report-retention-detail.component';

describe('ScPeyReportRetentionDetailComponent', () => {
  let component: ScPeyReportRetentionDetailComponent;
  let fixture: ComponentFixture<ScPeyReportRetentionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyReportRetentionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyReportRetentionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
