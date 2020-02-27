import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyShowBankComponent } from './sc-pey-show-bank.component';

describe('ScPeyShowBankComponent', () => {
  let component: ScPeyShowBankComponent;
  let fixture: ComponentFixture<ScPeyShowBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyShowBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyShowBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
