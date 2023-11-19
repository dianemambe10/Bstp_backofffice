import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDemandeListComponent } from './type-demande-list.component';

describe('TypeDemandeListComponent', () => {
  let component: TypeDemandeListComponent;
  let fixture: ComponentFixture<TypeDemandeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeDemandeListComponent]
    });
    fixture = TestBed.createComponent(TypeDemandeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
