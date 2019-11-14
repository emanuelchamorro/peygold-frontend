import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyMoneyRequestComponent } from './eu-pey-money-request.component';

describe('EuPeyMoneyRequestComponent', () => {
  let component: EuPeyMoneyRequestComponent;
  let fixture: ComponentFixture<EuPeyMoneyRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyMoneyRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyMoneyRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
