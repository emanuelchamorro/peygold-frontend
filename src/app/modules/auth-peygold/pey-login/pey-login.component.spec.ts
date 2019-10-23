import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeyLoginComponent } from './pey-login.component';

describe('PeyLoginComponent', () => {
  let component: PeyLoginComponent;
  let fixture: ComponentFixture<PeyLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeyLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
