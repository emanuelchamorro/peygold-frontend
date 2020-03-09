import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyCreditManagementComponent } from './sc-pey-credit-management.component';

describe('ScPeyCreditManagementComponent', () => {
  let component: ScPeyCreditManagementComponent;
  let fixture: ComponentFixture<ScPeyCreditManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyCreditManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyCreditManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
