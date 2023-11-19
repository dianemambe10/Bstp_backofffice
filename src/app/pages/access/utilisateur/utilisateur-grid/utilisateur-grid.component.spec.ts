import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateurGridComponent } from './utilisateur-grid.component';

describe('UtilisateurGridComponent', () => {
  let component: UtilisateurGridComponent;
  let fixture: ComponentFixture<UtilisateurGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtilisateurGridComponent]
    });
    fixture = TestBed.createComponent(UtilisateurGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
