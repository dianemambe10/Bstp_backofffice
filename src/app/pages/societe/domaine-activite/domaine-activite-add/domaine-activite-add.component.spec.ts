import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomaineActiviteAddComponent } from './domaine-activite-add.component';

describe('DomaineActiviteAddComponent', () => {
  let component: DomaineActiviteAddComponent;
  let fixture: ComponentFixture<DomaineActiviteAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DomaineActiviteAddComponent]
    });
    fixture = TestBed.createComponent(DomaineActiviteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
