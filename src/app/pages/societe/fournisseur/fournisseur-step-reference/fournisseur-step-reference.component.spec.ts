import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurStepReferenceComponent } from './fournisseur-step-reference.component';

describe('FournisseurStepReferenceComponent', () => {
  let component: FournisseurStepReferenceComponent;
  let fixture: ComponentFixture<FournisseurStepReferenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FournisseurStepReferenceComponent]
    });
    fixture = TestBed.createComponent(FournisseurStepReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
