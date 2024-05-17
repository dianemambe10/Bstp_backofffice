import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: 'nouveau',
    title: "BSTP |  Ajout d'un institut",
    component: AddComponent,
    data: {
      menu: "Institut",
      sousmenu: 'Ajout',
      role: []
    },
    canActivate: []
  },
  {
    path: 'edit/:id',
    title: "BSTP | Modification d'un institut",
    component: EditComponent,
    data: {
      menu: "Institut",
      sousmenu: 'Edit',
      role: []
    },
    canActivate: []
  },
  {
    path: 'details/:id',
    title: "BSTP | Detail d'un institut",
    component: DetailComponent,
    data: {
      menu: "Institut",
      sousmenu: 'Detail',
      role: []
    },
    canActivate: []
  },
  {
    path: '',
    title: "BSTP |  Liste des instituts",
    component: ListComponent,
    data: {
      menu: "Institut",
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
export class InstitutsRoutingModule { }
