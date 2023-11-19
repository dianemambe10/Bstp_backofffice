import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDemandeDetailComponent } from './type-demande-detail.component';

describe('TypeDemandeDetailComponent', () => {
  let component: TypeDemandeDetailComponent;
  let fixture: ComponentFixture<TypeDemandeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeDemandeDetailComponent]
    });
    fixture = TestBed.createComponent(TypeDemandeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
