import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeygoldQuestionsComponent } from './peygold-questions.component';

describe('PeygoldQuestionsComponent', () => {
  let component: PeygoldQuestionsComponent;
  let fixture: ComponentFixture<PeygoldQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeygoldQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeygoldQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
