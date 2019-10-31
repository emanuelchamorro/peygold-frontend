import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScPeySidebarComponent } from './sc-pey-sidebar.component';

describe('ScPeySidebarComponent', () => {
  let component: ScPeySidebarComponent;
  let fixture: ComponentFixture<ScPeySidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScPeySidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScPeySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
