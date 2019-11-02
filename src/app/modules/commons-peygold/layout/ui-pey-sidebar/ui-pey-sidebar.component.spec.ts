import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UIPeySidebarComponent } from './ui-pey-sidebar.component';

describe('UIPeySidebarComponent', () => {
  let component: UIPeySidebarComponent;
  let fixture: ComponentFixture<UIPeySidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UIPeySidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UIPeySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
