import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemandeAddComponent } from './demande-add/demande-add.component';
import { DemandeEditComponent } from './demande-edit/demande-edit.component';
import { DemandeDetailComponent } from './demande-detail/demande-detail.component';
import { DemandeListComponent } from './demande-list/demande-list.component';
import { DemandeGridComponent } from './demande-grid/demande-grid.component';

const routes: Routes = [
  {
    path: '',
    title: "Les demandes",
    children: [
      {
        path: 'nouveau',
        title: "BSTP |  Ajout d'une demande",
        component: DemandeAddComponent,
        data: {
          menu: 'Demande',
          sousmenu: 'Nouvelle',
          role: []
        },
        canActivate: []
      },
      {
        path: 'edit/:id',
        title: "BSTP | Modification d'une demande",
        component: DemandeEditComponent,
        data: {
          menu: 'Demande',
          sousmenu: 'Edition',
          role: []
        },
        canActivate: []
      },
      {
        path: 'details/:id',
        title: "BSTP | Detail d'une demande",
        component: DemandeDetailComponent,
        data: {
          menu: 'Demande',
          sousmenu: 'Detail',
          role: []
        },
        canActivate: []
      },
      {
        path: '',
        title: "BSTP | Liste des demandes",
        component: DemandeListComponent,
        data: {
          menu: 'Demande',
          sousmenu: 'Liste',
          role: []
        },
        canActivate: []
      },
      {
        path: 'grid',
        title: "BSTP | Grille des demandes",
        component: DemandeGridComponent,
        data: {
          menu: 'Demande',
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
export class DemandeRoutingModule { }
