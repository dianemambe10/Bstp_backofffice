import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelAddComponent } from './personnel-add.component';

describe('PersonnelAddComponent', () => {
  let component: PersonnelAddComponent;
  let fixture: ComponentFixture<PersonnelAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonnelAddComponent]
    });
    fixture = TestBed.createComponent(PersonnelAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
