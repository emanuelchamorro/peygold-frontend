import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyMoneyRequestsComponent } from './eu-pey-money-requests.component';

describe('EuPeyMoneyRequestsComponent', () => {
  let component: EuPeyMoneyRequestsComponent;
  let fixture: ComponentFixture<EuPeyMoneyRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyMoneyRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyMoneyRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
