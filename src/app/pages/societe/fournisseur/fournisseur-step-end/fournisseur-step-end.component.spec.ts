import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurStepEndComponent } from './fournisseur-step-end.component';

describe('FournisseurStepEndComponent', () => {
  let component: FournisseurStepEndComponent;
  let fixture: ComponentFixture<FournisseurStepEndComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FournisseurStepEndComponent]
    });
    fixture = TestBed.createComponent(FournisseurStepEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
