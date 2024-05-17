import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModePayementAddComponent } from './mode-payement-add.component';

describe('TypeDemandeAddComponent', () => {
  let component: ModePayementAddComponent;
  let fixture: ComponentFixture<ModePayementAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModePayementAddComponent]
    });
    fixture = TestBed.createComponent(ModePayementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
