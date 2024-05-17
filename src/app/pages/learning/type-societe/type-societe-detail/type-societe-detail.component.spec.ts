import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSocieteDetailComponent } from './type-societe-detail.component';

describe('TypeSocieteDetailComponent', () => {
  let component: TypeSocieteDetailComponent;
  let fixture: ComponentFixture<TypeSocieteDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeSocieteDetailComponent]
    });
    fixture = TestBed.createComponent(TypeSocieteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
