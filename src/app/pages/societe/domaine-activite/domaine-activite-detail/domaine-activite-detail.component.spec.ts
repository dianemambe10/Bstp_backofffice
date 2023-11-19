import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomaineActiviteDetailComponent } from './domaine-activite-detail.component';

describe('DomaineActiviteDetailComponent', () => {
  let component: DomaineActiviteDetailComponent;
  let fixture: ComponentFixture<DomaineActiviteDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DomaineActiviteDetailComponent]
    });
    fixture = TestBed.createComponent(DomaineActiviteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
