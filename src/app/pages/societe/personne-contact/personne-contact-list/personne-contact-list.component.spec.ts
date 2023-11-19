import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonneContactListComponent } from './personne-contact-list.component';

describe('PersonneContactListComponent', () => {
  let component: PersonneContactListComponent;
  let fixture: ComponentFixture<PersonneContactListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonneContactListComponent]
    });
    fixture = TestBed.createComponent(PersonneContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
