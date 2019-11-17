import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyMoneySendComponent } from './eu-pey-money-send.component';

describe('EuPeyMoneySendComponent', () => {
  let component: EuPeyMoneySendComponent;
  let fixture: ComponentFixture<EuPeyMoneySendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyMoneySendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyMoneySendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
