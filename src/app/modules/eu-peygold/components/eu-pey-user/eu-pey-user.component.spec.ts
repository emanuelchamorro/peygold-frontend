import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyUserComponent } from './eu-pey-user.component';

describe('EuPeyUserComponent', () => {
  let component: EuPeyUserComponent;
  let fixture: ComponentFixture<EuPeyUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
