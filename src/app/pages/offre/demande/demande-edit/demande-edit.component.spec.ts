import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeEditComponent } from './demande-edit.component';

describe('DemandeEditComponent', () => {
  let component: DemandeEditComponent;
  let fixture: ComponentFixture<DemandeEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandeEditComponent]
    });
    fixture = TestBed.createComponent(DemandeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
