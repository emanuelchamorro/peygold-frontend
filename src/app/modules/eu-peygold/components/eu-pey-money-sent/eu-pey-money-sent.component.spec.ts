import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyMoneySentComponent } from './eu-pey-money-sent.component';

describe('EuPeyMoneySentComponent', () => {
  let component: EuPeyMoneySentComponent;
  let fixture: ComponentFixture<EuPeyMoneySentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyMoneySentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyMoneySentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
