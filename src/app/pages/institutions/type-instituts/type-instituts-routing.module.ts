import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeDemandeAddComponent } from '../../offre/type-demande/type-demande-add/type-demande-add.component';
import { TypeDemandeEditComponent } from '../../offre/type-demande/type-demande-edit/type-demande-edit.component';

import { ListComponent } from './List/List.component';
import { AddComponent } from './add/add.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: 'nouveau',
    title: "BSTP |  Ajout d'un type d'institut",
    component: AddComponent,
    data: {
      menu: "Type d'institut",
      sousmenu: 'Ajout',
      role: []
    },
    canActivate: []
  },
  {
    path: 'edit/:id',
    title: "BSTP | Modification d'un type d'institut",
    component: EditComponent,
    data: {
      menu: "Type d'institut",
      sousmenu: 'Edit',
      role: []
    },
    canActivate: []
  },
  {
    path: 'details/:id',
    title: "BSTP | Detail d'un type d'institut",
    component: DetailComponent,
    data: {
      menu: "Type d'institut",
      sousmenu: 'Detail',
      role: []
    },
    canActivate: []
  },
  {
    path: '',
    title: "BSTP |  Liste des types  d'instituts",
    component: ListComponent,
    data: {
      menu: "Type d'institut",
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
export class TypeInstitutsRoutingModule { }
