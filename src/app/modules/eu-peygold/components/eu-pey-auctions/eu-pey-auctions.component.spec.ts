import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyAuctionsComponent } from './eu-pey-auctions.component';

describe('EuPeyAuctionsComponent', () => {
  let component: EuPeyAuctionsComponent;
  let fixture: ComponentFixture<EuPeyAuctionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyAuctionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyAuctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
