import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyMyauctionsComponent } from './eu-pey-myauctions.component';

describe('EuPeyMyauctionsComponent', () => {
  let component: EuPeyMyauctionsComponent;
  let fixture: ComponentFixture<EuPeyMyauctionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyMyauctionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyMyauctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
