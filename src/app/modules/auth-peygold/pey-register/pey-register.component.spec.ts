import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeyRegisterComponent } from './pey-register.component';

describe('PeyRegisterComponent', () => {
  let component: PeyRegisterComponent;
  let fixture: ComponentFixture<PeyRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeyRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeyRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
