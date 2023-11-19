import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomaineActiviteEditComponent } from './domaine-activite-edit.component';

describe('DomaineActiviteEditComponent', () => {
  let component: DomaineActiviteEditComponent;
  let fixture: ComponentFixture<DomaineActiviteEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DomaineActiviteEditComponent]
    });
    fixture = TestBed.createComponent(DomaineActiviteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
