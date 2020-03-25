import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyReportRetentionsComponent } from './sc-pey-report-retentions.component';

describe('ScPeyReportRetentionsComponent', () => {
  let component: ScPeyReportRetentionsComponent;
  let fixture: ComponentFixture<ScPeyReportRetentionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyReportRetentionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyReportRetentionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
