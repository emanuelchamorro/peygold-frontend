import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyDashboardComponent } from './sc-pey-dashboard.component';

describe('ScPeyDashboardComponent', () => {
  let component: ScPeyDashboardComponent;
  let fixture: ComponentFixture<ScPeyDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
