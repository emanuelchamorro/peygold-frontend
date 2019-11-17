import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UIPeyUserImageComponent } from './ui-pey-user-image.component';

describe('UIPeyUserImageComponent', () => {
  let component: UIPeyUserImageComponent;
  let fixture: ComponentFixture<UIPeyUserImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UIPeyUserImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UIPeyUserImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
