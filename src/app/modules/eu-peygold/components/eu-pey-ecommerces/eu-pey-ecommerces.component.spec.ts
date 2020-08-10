import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyEcommercesComponent } from './eu-pey-ecommerces.component';

describe('EuPeyEcommercesComponent', () => {
  let component: EuPeyEcommercesComponent;
  let fixture: ComponentFixture<EuPeyEcommercesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyEcommercesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyEcommercesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
