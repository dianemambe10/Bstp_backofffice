import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurEditComponent } from './fournisseur-edit.component';

describe('FournisseurEditComponent', () => {
  let component: FournisseurEditComponent;
  let fixture: ComponentFixture<FournisseurEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FournisseurEditComponent]
    });
    fixture = TestBed.createComponent(FournisseurEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
