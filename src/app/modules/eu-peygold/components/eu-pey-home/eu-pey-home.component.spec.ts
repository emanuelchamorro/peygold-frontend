import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyHomeComponent } from './eu-pey-home.component';

describe('EuPeyHomeComponent', () => {
  let component: EuPeyHomeComponent;
  let fixture: ComponentFixture<EuPeyHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
