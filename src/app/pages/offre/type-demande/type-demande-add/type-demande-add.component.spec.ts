import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDemandeAddComponent } from './type-demande-add.component';

describe('TypeDemandeAddComponent', () => {
  let component: TypeDemandeAddComponent;
  let fixture: ComponentFixture<TypeDemandeAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeDemandeAddComponent]
    });
    fixture = TestBed.createComponent(TypeDemandeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
