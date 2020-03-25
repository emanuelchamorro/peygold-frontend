import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeySettingsComponent } from './sc-pey-settings.component';

describe('ScPeySettingsComponent', () => {
  let component: ScPeySettingsComponent;
  let fixture: ComponentFixture<ScPeySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
