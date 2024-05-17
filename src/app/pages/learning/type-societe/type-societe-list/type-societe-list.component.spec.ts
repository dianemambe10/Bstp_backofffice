import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSocieteListComponent } from './type-societe-list.component';

describe('TypeSocieteListComponent', () => {
  let component: TypeSocieteListComponent;
  let fixture: ComponentFixture<TypeSocieteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeSocieteListComponent]
    });
    fixture = TestBed.createComponent(TypeSocieteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
