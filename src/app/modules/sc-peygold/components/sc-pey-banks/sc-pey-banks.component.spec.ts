import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyBanksComponent } from './sc-pey-banks.component';

describe('ScPeyBanksComponent', () => {
  let component: ScPeyBanksComponent;
  let fixture: ComponentFixture<ScPeyBanksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyBanksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyBanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
