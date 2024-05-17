import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeSocieteAddComponent } from './type-societe-add/type-societe-add.component';
import { TypeSocieteEditComponent } from './type-societe-edit/type-societe-edit.component';
import { TypeSocieteListComponent } from './type-societe-list/type-societe-list.component';
import { TypeSocieteDetailComponent } from './type-societe-detail/type-societe-detail.component';

const routes: Routes = [
  {
    path: 'nouveau',
    title: "BSTP |  Ajout d'un thématique",
    component: TypeSocieteAddComponent,
    data: {
      menu: 'Forme jurdique',
      sousmenu: 'Ajout',
      role: []
    },
    canActivate: []
  },
  {
    path: 'edit/:id',
    title: "BSTP | Modification d'un thématique",
    component: TypeSocieteEditComponent,
    data: {
      menu: 'Forme jurdique',
      sousmenu: 'Edit',
      role: []
    },
    canActivate: []
  },
  {
    path: 'details/:id',
    title: "BSTP | Detail d'un thématique",
    component: TypeSocieteDetailComponent,
    data: {
      menu: 'Forme jurdique',
      sousmenu: 'Detail',
      role: []
    },
    canActivate: []
  },
  {
    path: '',
    title: "BSTP |  Liste des types de sociétés",
    component: TypeSocieteListComponent,
    data: {
      menu: 'Forme jurdique',
      sousmenu: 'Liste',
      role: []
    },
    canActivate: []
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeSocieteRoutingModule { }
