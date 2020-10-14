import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuPeyAuctionComponent } from './eu-pey-auction.component';

describe('EuPeyAuctionComponent', () => {
  let component: EuPeyAuctionComponent;
  let fixture: ComponentFixture<EuPeyAuctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuPeyAuctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuPeyAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
