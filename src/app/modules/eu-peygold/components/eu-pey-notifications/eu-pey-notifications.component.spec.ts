import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyNotificationsComponent } from './eu-pey-notifications.component';

describe('EuPeyNotificationsComponent', () => {
  let component: EuPeyNotificationsComponent;
  let fixture: ComponentFixture<EuPeyNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
