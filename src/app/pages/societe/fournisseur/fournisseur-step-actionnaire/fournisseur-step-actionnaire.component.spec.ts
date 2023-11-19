import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurStepActionnaireComponent } from './fournisseur-step-actionnaire.component';

describe('FournisseurStepActionnaireComponent', () => {
  let component: FournisseurStepActionnaireComponent;
  let fixture: ComponentFixture<FournisseurStepActionnaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FournisseurStepActionnaireComponent]
    });
    fixture = TestBed.createComponent(FournisseurStepActionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
