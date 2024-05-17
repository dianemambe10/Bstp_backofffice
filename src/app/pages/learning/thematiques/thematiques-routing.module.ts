import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: 'nouveau',
    title: "BSTP |  Ajout d'un thématique",
    component: AddComponent,
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
    component: EditComponent,
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
    component: DetailComponent,
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
    component: ListComponent,
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
export class ThematiquesRoutingModule { }
