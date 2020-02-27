import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyStoreBankComponent } from './sc-pey-store-bank.component';

describe('ScPeyStoreBankComponent', () => {
  let component: ScPeyStoreBankComponent;
  let fixture: ComponentFixture<ScPeyStoreBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyStoreBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyStoreBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
