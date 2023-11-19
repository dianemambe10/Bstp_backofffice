import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSocieteEditComponent } from './type-societe-edit.component';

describe('TypeSocieteEditComponent', () => {
  let component: TypeSocieteEditComponent;
  let fixture: ComponentFixture<TypeSocieteEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeSocieteEditComponent]
    });
    fixture = TestBed.createComponent(TypeSocieteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
