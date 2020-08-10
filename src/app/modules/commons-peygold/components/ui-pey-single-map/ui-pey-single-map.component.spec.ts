import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPeySingleMapComponent } from './ui-pey-single-map.component';

describe('UiPeySingleMapComponent', () => {
  let component: UiPeySingleMapComponent;
  let fixture: ComponentFixture<UiPeySingleMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiPeySingleMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiPeySingleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
