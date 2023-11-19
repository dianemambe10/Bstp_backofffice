import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonneContactEditComponent } from './personne-contact-edit.component';

describe('PersonneContactEditComponent', () => {
  let component: PersonneContactEditComponent;
  let fixture: ComponentFixture<PersonneContactEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonneContactEditComponent]
    });
    fixture = TestBed.createComponent(PersonneContactEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
