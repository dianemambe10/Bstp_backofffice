import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonneContactAddComponent } from './personne-contact-add.component';

describe('PersonneContactAddComponent', () => {
  let component: PersonneContactAddComponent;
  let fixture: ComponentFixture<PersonneContactAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonneContactAddComponent]
    });
    fixture = TestBed.createComponent(PersonneContactAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
