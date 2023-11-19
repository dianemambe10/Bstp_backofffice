import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonneContactDetailComponent } from './personne-contact-detail.component';

describe('PersonneContactDetailComponent', () => {
  let component: PersonneContactDetailComponent;
  let fixture: ComponentFixture<PersonneContactDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonneContactDetailComponent]
    });
    fixture = TestBed.createComponent(PersonneContactDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
