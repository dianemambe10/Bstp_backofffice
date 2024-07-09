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
    title: "BSTP |  Ajout  d'un financement",
    component: AddComponent,
    data: {
      menu: 'Financement',
      sousmenu: 'Ajout',
      role: []
    },
    canActivate: []
  },
  {
    path: 'edit/:id',
    title: "BSTP | Modification  d'un financement",
    component: EditComponent,
    data: {
      menu: 'Financement',
      sousmenu: 'Edit',
      role: []
    },
    canActivate: []
  },
  {
    path: 'details/:id',
    title: "BSTP | Detail  de financements",
    component: DetailComponent,
    data: {
      menu: 'Financement',
      sousmenu: 'Detail',
      role: []
    },
    canActivate: []
  },
  {
    path: 'grid',
    title: "BSTP |  Grille de financements",
    component: GridComponent,
    data: {
      menu: 'Financement',
      sousmenu: 'Liste',
      role: []
    },
    canActivate: []
  },
  {
    path: '',
    title: "BSTP |  Liste de financements",
    component: ListComponent,
    data: {
      menu: 'Financement',
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
export class FinancementRoutingModule { }
