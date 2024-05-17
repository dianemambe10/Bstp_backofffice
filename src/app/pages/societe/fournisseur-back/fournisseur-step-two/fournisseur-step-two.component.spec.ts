import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurStepTwoComponent } from './fournisseur-step-two.component';

describe('FournisseurStepTwoComponent', () => {
  let component: FournisseurStepTwoComponent;
  let fixture: ComponentFixture<FournisseurStepTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FournisseurStepTwoComponent]
    });
    fixture = TestBed.createComponent(FournisseurStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
