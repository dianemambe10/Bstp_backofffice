import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcheteurStepOneComponent } from './acheteur-step-one.component';

describe('AcheteurStepOneComponent', () => {
  let component: AcheteurStepOneComponent;
  let fixture: ComponentFixture<AcheteurStepOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcheteurStepOneComponent]
    });
    fixture = TestBed.createComponent(AcheteurStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
