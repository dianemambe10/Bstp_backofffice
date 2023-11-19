import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomaineActiviteListComponent } from './domaine-activite-list.component';

describe('DomaineActiviteListComponent', () => {
  let component: DomaineActiviteListComponent;
  let fixture: ComponentFixture<DomaineActiviteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DomaineActiviteListComponent]
    });
    fixture = TestBed.createComponent(DomaineActiviteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
