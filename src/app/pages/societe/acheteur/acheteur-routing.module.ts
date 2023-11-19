import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcheteurAddComponent } from './acheteur-add/acheteur-add.component';
import { AcheteurEditComponent } from './acheteur-edit/acheteur-edit.component';
import { AcheteurListComponent } from './acheteur-list/acheteur-list.component';
import { AcheteurDetailComponent } from './acheteur-detail/acheteur-detail.component';
import { AcheteurGridComponent } from './acheteur-grid/acheteur-grid.component';



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


    ],
    canActivate: []
  }
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcheteurRoutingModule { }
