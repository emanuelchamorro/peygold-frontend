import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyShowUserComponent } from './sc-pey-show-user.component';

describe('ScPeyShowUserComponent', () => {
  let component: ScPeyShowUserComponent;
  let fixture: ComponentFixture<ScPeyShowUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyShowUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyShowUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
