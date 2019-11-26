import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyQrGeneratorComponent } from './eu-pey-qr-generator.component';

describe('EuPeyQrGeneratorComponent', () => {
  let component: EuPeyQrGeneratorComponent;
  let fixture: ComponentFixture<EuPeyQrGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyQrGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyQrGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
