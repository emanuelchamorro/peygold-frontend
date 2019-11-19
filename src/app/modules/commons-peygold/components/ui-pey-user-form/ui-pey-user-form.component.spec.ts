import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UIPeyUserFormComponent } from './ui-pey-user-form.component';

describe('UIPeyUserFormComponent', () => {
  let component: UIPeyUserFormComponent;
  let fixture: ComponentFixture<UIPeyUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UIPeyUserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UIPeyUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
