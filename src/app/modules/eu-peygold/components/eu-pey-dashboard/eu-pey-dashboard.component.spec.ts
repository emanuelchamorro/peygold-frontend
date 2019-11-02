import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyDashboardComponent } from './eu-pey-dashboard.component';

describe('EuPeyDashboardComponent', () => {
  let component: EuPeyDashboardComponent;
  let fixture: ComponentFixture<EuPeyDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
