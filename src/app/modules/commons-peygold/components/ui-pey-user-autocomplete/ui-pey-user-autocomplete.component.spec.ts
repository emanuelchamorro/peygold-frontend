import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UIPeyUserAutocompleteComponent } from './ui-pey-user-autocomplete.component';

describe('UIPeyUserAutocompleteComponent', () => {
  let component: UIPeyUserAutocompleteComponent;
  let fixture: ComponentFixture<UIPeyUserAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UIPeyUserAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UIPeyUserAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
