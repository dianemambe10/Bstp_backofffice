import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModePayementDetailComponent } from './mode-payement-detail.component';

describe('TypeDemandeDetailComponent', () => {
  let component: ModePayementDetailComponent;
  let fixture: ComponentFixture<ModePayementDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModePayementDetailComponent]
    });
    fixture = TestBed.createComponent(ModePayementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
