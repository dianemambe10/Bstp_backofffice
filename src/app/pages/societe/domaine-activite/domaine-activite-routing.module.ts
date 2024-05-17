import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DomaineActiviteAddComponent} from "./domaine-activite-add/domaine-activite-add.component";
import {DomaineActiviteEditComponent} from "./domaine-activite-edit/domaine-activite-edit.component";
import {DomaineActiviteDetailComponent} from "./domaine-activite-detail/domaine-activite-detail.component";
import {DomaineActiviteListComponent} from "./domaine-activite-list/domaine-activite-list.component";


const routes: Routes = [
  {
    path: 'nouveau',
    title: "BSTP |  Ajout d'un domaine d'activité",
    component: DomaineActiviteAddComponent,
    data: {
      menu: "Domaine d'activité",
      sousmenu: 'Ajout',
      role: []
    },
    canActivate: []
  },
  {
    path: 'edit/:id',
    title: "BSTP | Modification d'un domaine d'activité",
    component: DomaineActiviteEditComponent,
    data: {
      menu: "Domaine d'activité",
      sousmenu: 'Edit',
      role: []
    },
    canActivate: []
  },
  {
    path: 'details/:id',
    title: "BSTP | Detail d'un domaine d'activité",
    component: DomaineActiviteDetailComponent,
    data: {
      menu: "Domaine d'activité",
      sousmenu: 'Detail',
      role: []
    },
    canActivate: []
  },
  {
    path: '',
    title: "BSTP |  Liste des domaines d'activités",
    component: DomaineActiviteListComponent,
    data: {
      menu: "Domaine d'activité",
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
export class DomaineActiviteRoutingModule { }
