import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeySuccessComponent } from './pey-success.component';

describe('PeySuccessComponent', () => {
  let component: PeySuccessComponent;
  let fixture: ComponentFixture<PeySuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeySuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeySuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
