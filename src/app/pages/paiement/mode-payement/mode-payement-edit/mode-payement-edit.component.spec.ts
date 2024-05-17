import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModePayementEditComponent } from './mode-payement-edit.component';

describe('TypeDemandeEditComponent', () => {
  let component: ModePayementEditComponent;
  let fixture: ComponentFixture<ModePayementEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModePayementEditComponent]
    });
    fixture = TestBed.createComponent(ModePayementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
