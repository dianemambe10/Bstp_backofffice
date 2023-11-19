import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeAddComponent } from './demande-add.component';

describe('DemandeAddComponent', () => {
  let component: DemandeAddComponent;
  let fixture: ComponentFixture<DemandeAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandeAddComponent]
    });
    fixture = TestBed.createComponent(DemandeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
