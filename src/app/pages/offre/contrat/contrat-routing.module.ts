import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContratAddComponent } from './contrat-add/contrat-add.component';
import { ContratEditComponent } from './contrat-edit/contrat-edit.component';
import { ContratDetailComponent } from './contrat-detail/contrat-detail.component';
import { ContratListComponent } from './contrat-list/contrat-list.component';


const routes: Routes = [
  {
    path: '',
    title: "Les contrats",
    children: [
      {
        path: 'nouveau',
        title: "BSTP |  Ajout d'un contrat",
        component: ContratAddComponent,
        data: {
          menu: 'Contrat',
          sousmenu: 'Nouveau',
          role: []
        },
        canActivate: []
      },
      {
        path: 'edit/:id',
        title: "BSTP | Modification d'un contrat",
        component: ContratEditComponent,
        data: {
          menu: 'Contrat',
          sousmenu: 'Edition',
          role: []
        },
        canActivate: []
      },
      {
        path: 'details/:id',
        title: "BSTP | Detail d'un contrat",
        component: ContratDetailComponent,
        data: {
          menu: 'Contrat',
          sousmenu: 'Detail',
          role: []
        },
        canActivate: []
      },
      {
        path: '',
        title: "BSTP | Liste des contrats",
        component: ContratListComponent,
        data: {
          menu: 'Contrat',
          sousmenu: 'Liste',
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
export class ContratRoutingModule { }
