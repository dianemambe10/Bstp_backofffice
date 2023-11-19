import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcheteurStepTwoComponent } from './acheteur-step-two.component';

describe('AcheteurStepTwoComponent', () => {
  let component: AcheteurStepTwoComponent;
  let fixture: ComponentFixture<AcheteurStepTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcheteurStepTwoComponent]
    });
    fixture = TestBed.createComponent(AcheteurStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
