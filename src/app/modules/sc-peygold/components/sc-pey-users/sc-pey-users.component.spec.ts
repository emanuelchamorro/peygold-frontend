import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyUsersComponent } from './sc-pey-users.component';

describe('ScPeyUsersComponent', () => {
  let component: ScPeyUsersComponent;
  let fixture: ComponentFixture<ScPeyUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
