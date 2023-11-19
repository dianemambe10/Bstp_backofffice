import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSocieteAddComponent } from './type-societe-add.component';

describe('TypeSocieteAddComponent', () => {
  let component: TypeSocieteAddComponent;
  let fixture: ComponentFixture<TypeSocieteAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeSocieteAddComponent]
    });
    fixture = TestBed.createComponent(TypeSocieteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
