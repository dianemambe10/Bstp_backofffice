import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelDetailComponent } from './personnel-detail.component';

describe('PersonnelDetailComponent', () => {
  let component: PersonnelDetailComponent;
  let fixture: ComponentFixture<PersonnelDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonnelDetailComponent]
    });
    fixture = TestBed.createComponent(PersonnelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
