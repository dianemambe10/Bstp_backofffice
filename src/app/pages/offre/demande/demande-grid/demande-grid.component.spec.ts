import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeGridComponent } from './demande-grid.component';

describe('DemandeGridComponent', () => {
  let component: DemandeGridComponent;
  let fixture: ComponentFixture<DemandeGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandeGridComponent]
    });
    fixture = TestBed.createComponent(DemandeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
