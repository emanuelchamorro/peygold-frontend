import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyCardComponent } from './eu-pey-card.component';

describe('EuPeyCardComponent', () => {
  let component: EuPeyCardComponent;
  let fixture: ComponentFixture<EuPeyCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
