import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { GridComponent } from './grid/grid.component';

const routes: Routes = [
  {
    path: 'nouveau',
    title: "BSTP |  Ajout  d'une formations",
    component: AddComponent,
    data: {
      menu: 'Formation',
      sousmenu: 'Ajout',
      role: []
    },
    canActivate: []
  },
  {
    path: 'edit/:id',
    title: "BSTP | Modification  d'une formation",
    component: EditComponent,
    data: {
      menu: 'Formation',
      sousmenu: 'Edit',
      role: []
    },
    canActivate: []
  },
  {
    path: 'details/:id',
    title: "BSTP | Detail  des formations",
    component: DetailComponent,
    data: {
      menu: 'Formation',
      sousmenu: 'Detail',
      role: []
    },
    canActivate: []
  },
  {
    path: 'grid',
    title: "BSTP |  Grille des formations",
    component: GridComponent,
    data: {
      menu: 'Formation',
      sousmenu: 'Liste',
      role: []
    },
    canActivate: []
  },
  {
    path: '',
    title: "BSTP |  Liste des types de sociétés",
    component: ListComponent,
    data: {
      menu: 'Formation',
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
export class FormationsRoutingModule { }
