import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FournisseurAddComponent } from './fournisseur-add/fournisseur-add.component';
import { FournisseurEditComponent } from './fournisseur-edit/fournisseur-edit.component';
import { FournisseurDetailComponent } from './fournisseur-detail/fournisseur-detail.component';
import { FournisseurListComponent } from './fournisseur-list/fournisseur-list.component';
import { FournisseurGridComponent } from './fournisseur-grid/fournisseur-grid.component';

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
      role: []
    },
    canActivate: []
  },
{
    path: 'utilisateurs',
    title: "BSTP | les liste d'utilisateur",
    component: FournisseurGridComponent,
    data: {
      menu: 'Founisseurs',
      sousmenu: 'Grille',
      role: []
    },
    canActivate: []
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FournisseurRoutingModule { }
