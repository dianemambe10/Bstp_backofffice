import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurStepThreeComponent } from './fournisseur-step-three.component';

describe('FournisseurStepThreeComponent', () => {
  let component: FournisseurStepThreeComponent;
  let fixture: ComponentFixture<FournisseurStepThreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FournisseurStepThreeComponent]
    });
    fixture = TestBed.createComponent(FournisseurStepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
