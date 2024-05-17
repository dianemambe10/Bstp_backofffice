import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbonnementAddComponent } from './abonnement-add/abonnement-add.component';
import { AbonnementEditComponent } from './abonnement-edit/abonnement-edit.component';
import { AbonnementDetailComponent } from './abonnement-detail/abonnement-detail.component';
import { AbonnementListComponent } from './abonnement-list/abonnement-list.component';

const routes: Routes = [
  {
    path: '',
    title: "Les types de demandes",
    children: [
      {
        path: 'nouveau',
        title: "BSTP |  Ajout d'un paiement",
        component: AbonnementAddComponent,
        data: {
          menu: 'Paiement',
          sousmenu: 'Nouvelle',
          role: []
        },
        canActivate: []
      },
      {
        path: 'edit/:id',
        title: "BSTP | Modification d'un paiement",
        component: AbonnementEditComponent,
        data: {
          menu: 'Paiement',
          sousmenu: 'Edition',
          role: []
        },
        canActivate: []
      },
      {
        path: 'details/:id',
        title: "BSTP | Detail d'un paiement",
        component: AbonnementDetailComponent,
        data: {
          menu: 'Paiement',
          sousmenu: 'Detail',
          role: []
        },
        canActivate: []
      },
      {
        path: '',
        title: "BSTP | Liste des paiements",
        component: AbonnementListComponent ,
        data: {
          menu: 'Paiement',
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
export class AbonnementRoutingModule { }
