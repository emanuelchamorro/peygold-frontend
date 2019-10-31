import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeyLayoutComponent } from './sc-pey-layout.component';

describe('ScPeyLayoutComponent', () => {
  let component: ScPeyLayoutComponent;
  let fixture: ComponentFixture<ScPeyLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeyLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
