import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurStepOneComponent } from './fournisseur-step-one.component';

describe('FournisseurStepOneComponent', () => {
  let component: FournisseurStepOneComponent;
  let fixture: ComponentFixture<FournisseurStepOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FournisseurStepOneComponent]
    });
    fixture = TestBed.createComponent(FournisseurStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
