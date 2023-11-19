import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcheteurStepEndComponent } from './acheteur-step-end.component';

describe('AcheteurStepEndComponent', () => {
  let component: AcheteurStepEndComponent;
  let fixture: ComponentFixture<AcheteurStepEndComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcheteurStepEndComponent]
    });
    fixture = TestBed.createComponent(AcheteurStepEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
