import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDemandeEditComponent } from './type-demande-edit.component';

describe('TypeDemandeEditComponent', () => {
  let component: TypeDemandeEditComponent;
  let fixture: ComponentFixture<TypeDemandeEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeDemandeEditComponent]
    });
    fixture = TestBed.createComponent(TypeDemandeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
