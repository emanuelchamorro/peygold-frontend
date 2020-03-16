import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyLoanSettlementsComponent } from './sc-pey-loan-settlements.component';

describe('ScPeyLoanSettlementsComponent', () => {
  let component: ScPeyLoanSettlementsComponent;
  let fixture: ComponentFixture<ScPeyLoanSettlementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyLoanSettlementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyLoanSettlementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
