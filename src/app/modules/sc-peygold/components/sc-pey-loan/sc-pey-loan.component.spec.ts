import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyLoanComponent } from './sc-pey-loan.component';

describe('ScPeyLoanComponent', () => {
  let component: ScPeyLoanComponent;
  let fixture: ComponentFixture<ScPeyLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
