import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FournisseurAddComponent } from './fournisseur-add/fournisseur-add.component';
import { FournisseurEditComponent } from './fournisseur-edit/fournisseur-edit.component';
import { FournisseurDetailComponent } from './fournisseur-detail/fournisseur-detail.component';
import { FournisseurListComponent } from './fournisseur-list/fournisseur-list.component';
import { FournisseurGridComponent } from './fournisseur-grid/fournisseur-grid.component';
import {UtilisateurAddComponent} from "../../access/utilisateur/utilisateur-add/utilisateur-add.component";
import {UtilisateurEditComponent} from "../../access/utilisateur/utilisateur-edit/utilisateur-edit.component";
import {UtilisateurDetailComponent} from "../../access/utilisateur/utilisateur-detail/utilisateur-detail.component";
import {UtilisateurListComponent} from "../../access/utilisateur/utilisateur-list/utilisateur-list.component";
import {UtilisateurGridComponent} from "../../access/utilisateur/utilisateur-grid/utilisateur-grid.component";
import { UtilisateurListFournisseurComponent } from '../../access/utilisateur/utilisateur-list-fournisseur/utilisateur-list-fournisseur.component';

const routes: Routes = [
  {
    path: 'nouveau',
    title: "BSTP |  Ajout d'un fournisseur",
    component: FournisseurAddComponent,
    data: {
      menu: 'Founisseurs',
      sousmenu: 'Ajout',
      role: []
    },
    canActivate: []
  },
  {
    path: 'edit/:id',
    title: "BSTP | Modification d'un fournisseur",
    component: FournisseurEditComponent,
    data: {
      menu: 'Founisseurs',
      sousmenu: 'Edit',
      role: []
    },
    canActivate: []
  },
  {
    path: 'detail/:id',
    title: "BSTP | Detail d'un fournisseur",
    component: FournisseurDetailComponent,
    data: {
      menu: 'Founisseurs',
      sousmenu: 'Detail',
      role: []
    },
    canActivate: []
  },
  {
    path: '',
    title: "BSTP |  Liste de fournisseurs",
    component: FournisseurListComponent,
    data: {
      menu: 'Founisseurs',
      sousmenu: 'Liste',
      categorie: 'acheteur',
      role: []
    },
    canActivate: []
  },
  {
    path: 'grid',
    title: "BSTP | Grille des acheteurs",
    component: FournisseurGridComponent,
    data: {
      menu: 'Founisseurs',
      sousmenu: 'Grille',
      categorie: 'acheteur',
      role: []
    },
    canActivate: []
  },
  {
    path: 'utilisateurs',
    title: "Les utilisateur des fournisseurs",
    children: [
      {
        path: 'nouveau',
        title: "BSTP |  Ajout d'un utilisateur",
        component: UtilisateurAddComponent,
        data: {
          menu: 'Utilisateur',
          sousmenu: 'Nouveau',
          categorie: 'fournisseur',
          role: []
        },
        canActivate: []
      },
      {
        path: 'edit/:tag/:id',
        title: "BSTP | Modification d'un utilisateur",
        component: UtilisateurEditComponent,
        data: {
          menu: 'Utilisateur',
          sousmenu: 'Edition',
          categorie: 'fournisseur',
          role: []
        },
        canActivate: []
      },
      {
        path: 'details/:tag/:id',
        title: "BSTP | Detail d'un utilisateur",
        component: UtilisateurDetailComponent,
        data: {
          menu: 'Utilisateur',
          sousmenu: 'Detail',
          categorie: 'fournisseur',
          role: []
        },
        canActivate: []
      },
      {
        path: '',
        title: "BSTP | Liste des Utilisateurs ",
        component: UtilisateurListFournisseurComponent,
        data: {
          menu: 'Utilisateur',
          sousmenu: 'Liste',
          categorie: 'fournisseur',
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
          categorie: 'fournisseur',
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
export class FournisseurRoutingModule { }
