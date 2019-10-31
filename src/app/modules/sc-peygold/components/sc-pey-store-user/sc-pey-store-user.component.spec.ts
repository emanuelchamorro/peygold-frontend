import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyStoreUserComponent } from './sc-pey-store-user.component';

describe('ScPeyStoreUserComponent', () => {
  let component: ScPeyStoreUserComponent;
  let fixture: ComponentFixture<ScPeyStoreUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyStoreUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyStoreUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
