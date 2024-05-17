import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcheteurAddComponent } from './acheteur-add/acheteur-add.component';
import { AcheteurEditComponent } from './acheteur-edit/acheteur-edit.component';
import { AcheteurListComponent } from './acheteur-list/acheteur-list.component';
import { AcheteurDetailComponent } from './acheteur-detail/acheteur-detail.component';
import { AcheteurGridComponent } from './acheteur-grid/acheteur-grid.component';
import {UtilisateurAddComponent} from "../../access/utilisateur/utilisateur-add/utilisateur-add.component";
import {UtilisateurEditComponent} from "../../access/utilisateur/utilisateur-edit/utilisateur-edit.component";
import {UtilisateurDetailComponent} from "../../access/utilisateur/utilisateur-detail/utilisateur-detail.component";
import {UtilisateurListComponent} from "../../access/utilisateur/utilisateur-list/utilisateur-list.component";
import {UtilisateurGridComponent} from "../../access/utilisateur/utilisateur-grid/utilisateur-grid.component";
import {
  UtilisateurProfilSettingsComponent
} from "../../access/utilisateur/utilisateur-profil-settings/utilisateur-profil-settings.component";
import { UtilisateurListFournisseurComponent } from '../../access/utilisateur/utilisateur-list-fournisseur/utilisateur-list-fournisseur.component';
import { UtilisateurListBuyerComponent } from '../../access/utilisateur/utilisateur-list-buyer/utilisateur-list-buyer.component';



const routes: Routes = [
  {
    path: '',
    title: "Les acheteurs",
    children: [
      {
        path: 'nouveau',
        title: "BSTP |  Ajout d'un acheteur",
        component: AcheteurAddComponent,
        data: {
          menu: 'Acheteur',
          sousmenu: 'Nouveau',
          role: []
        },
        canActivate: []
      },
      {
        path: 'edit/:id',
        title: "BSTP | Modification d'un acheteur",
        component: AcheteurEditComponent,
        data: {
          menu: 'Acheteur',
          sousmenu: 'Edition',
          role: []
        },
        canActivate: []
      },
      {
        path: 'details/:id',
        title: "BSTP | Detail d'un acheteur",
        component: AcheteurDetailComponent,
        data: {
          menu: 'Acheteur',
          sousmenu: 'Detail',
          role: []
        },
        canActivate: []
      },
      {
        path: '',
        title: "BSTP | Liste des acheteurs",
        component: AcheteurListComponent,
        data: {
          menu: 'Acheteur',
          sousmenu: 'Liste',
          role: []
        },
        canActivate: []
      },
      {
        path: 'grid',
        title: "BSTP | Grille des acheteurs",
        component: AcheteurGridComponent,
        data: {
          menu: 'Acheteur',
          sousmenu: 'Grid',
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
              categorie: 'acheteur',
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
              categorie: 'acheteur',
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
              categorie: 'acheteur',
              role: []
            },
            canActivate: []
          },
          {
            path: '',
            title: "BSTP | Liste des Utilisateurs ",
            component: UtilisateurListBuyerComponent,
            data: {
              menu: 'Utilisateur',
              sousmenu: 'Liste',
              categorie: 'acheteur',
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
              categorie: 'acheteur',
              role: []
            },
            canActivate: []
          },
        ],
        canActivate: []
      }


    ],
    canActivate: []
  }
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcheteurRoutingModule { }
