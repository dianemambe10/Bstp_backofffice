import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurGridComponent } from './fournisseur-grid.component';

describe('FournisseurGridComponent', () => {
  let component: FournisseurGridComponent;
  let fixture: ComponentFixture<FournisseurGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FournisseurGridComponent]
    });
    fixture = TestBed.createComponent(FournisseurGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
