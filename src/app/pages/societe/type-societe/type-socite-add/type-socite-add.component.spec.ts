import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSociteAddComponent } from './type-socite-add.component';

describe('TypeSociteAddComponent', () => {
  let component: TypeSociteAddComponent;
  let fixture: ComponentFixture<TypeSociteAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeSociteAddComponent]
    });
    fixture = TestBed.createComponent(TypeSociteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
