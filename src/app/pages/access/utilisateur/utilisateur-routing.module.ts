import { UtilisateurListComponent } from './utilisateur-list/utilisateur-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilisateurAddComponent } from './utilisateur-add/utilisateur-add.component';
import { UtilisateurEditComponent } from './utilisateur-edit/utilisateur-edit.component';
import { UtilisateurDetailComponent } from './utilisateur-detail/utilisateur-detail.component';
import { UtilisateurGridComponent } from './utilisateur-grid/utilisateur-grid.component';
import {UtilisateurProfilSettingsComponent} from "./utilisateur-profil-settings/utilisateur-profil-settings.component";
import { UtilisateurListFournisseurComponent } from './utilisateur-list-fournisseur/utilisateur-list-fournisseur.component';


const routes: Routes = [
  {
    path: '',
    title: "Les utilisateur",
    children: [
      {
        path: 'nouveau',
        title: "BSTP |  Ajout d'un utilisateur",
        component: UtilisateurAddComponent,
        data: {
          menu: 'Utilisateur',
          sousmenu: 'Nouveau',
          categorie: 'BSTP',
          role: []
        },
        canActivate: []
      },
      {
        path: 'edit/:id',
        title: "BSTP | Modification d'un utilisateur",
        component: UtilisateurEditComponent,
        data: {
          menu: 'Utilisateur',
          sousmenu: 'Edition',
          categorie: 'BSTP',
          role: []
        },
        canActivate: []
      },
      {
        path: 'details/:id',
        title: "BSTP | Detail d'un utilisateur",
        component: UtilisateurDetailComponent,
        data: {
          menu: 'Utilisateur',
          sousmenu: 'Detail',
          categorie: 'BSTP',
          role: []
        },
        canActivate: []
      },
      {
        path: '',
        title: "BSTP | Liste des Utilisateurs ",
        component: UtilisateurListComponent,
        data: {
          menu: 'Utilisateur',
          sousmenu: 'Liste',
          categorie: 'BSTP',
          role: []
        },
        canActivate: []
      },
      {
        path: 'grid',
        title: "BSTP | Grille des Utilisateurs ",
        component: UtilisateurGridComponent,
        data: {
          menu: 'Utilisateur',
          sousmenu: 'Grid',
          categorie: 'BSTP',
          role: []
        },
        canActivate: []
      },
      {
        path: 'profile-settings',
        title: "BSTP | Paremètre d'utilisateur ",
        component: UtilisateurProfilSettingsComponent,
        data: {
          menu: 'Utilisateur',
          sousmenu: 'Paremètre',
          categorie: 'BSTP',
          role: []
        },
        canActivate: []
      },
      {
        path: 'fournisseurs',
        title: "BSTP | Paremètre d'utilisateur ",
        component: UtilisateurListFournisseurComponent,
        data: {
          menu: 'Utilisateur',
          sousmenu: 'Paremètre',
          categorie: 'BSTP',
          role: []
        },
        canActivate: []
      },




    ],
    canActivate: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilisateurRoutingModule { }
