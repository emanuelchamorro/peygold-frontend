import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyLoanDetailComponent } from './sc-pey-loan-detail.component';

describe('ScPeyLoanDetailComponent', () => {
  let component: ScPeyLoanDetailComponent;
  let fixture: ComponentFixture<ScPeyLoanDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyLoanDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyLoanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
