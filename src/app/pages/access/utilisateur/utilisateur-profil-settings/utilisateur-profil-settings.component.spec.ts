import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateurProfilSettingsComponent } from './utilisateur-profil-settings.component';

describe('UtilisateurProfilSettingsComponent', () => {
  let component: UtilisateurProfilSettingsComponent;
  let fixture: ComponentFixture<UtilisateurProfilSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtilisateurProfilSettingsComponent]
    });
    fixture = TestBed.createComponent(UtilisateurProfilSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
