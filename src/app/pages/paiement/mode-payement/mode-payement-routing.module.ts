import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModePayementAddComponent } from './mode-payement-add/mode-payement-add.component';
import { ModePayementEditComponent } from './mode-payement-edit/mode-payement-edit.component';
import { ModePayementListComponent } from './mode-payement-list/mode-payement-list.component';
import { ModePayementDetailComponent } from './mode-payement-detail/mode-payement-detail.component';


const routes: Routes = [
  {
    path: '',
    title: "Les types de demandes",
    children: [
      {
        path: 'nouveau',
        title: "BSTP |  Ajout d'un mode de payement",
        component: ModePayementAddComponent,
        data: {
          menu: 'Mode de payement',
          sousmenu: 'Nouvelle',
          role: []
        },
        canActivate: []
      },
      {
        path: 'edit/:id',
        title: "BSTP | Modification d'un mode de payement",
        component: ModePayementEditComponent,
        data: {
          menu: 'Mode de payement',
          sousmenu: 'Edition',
          role: []
        },
        canActivate: []
      },
      {
        path: 'details/:id',
        title: "BSTP | Detail d'un mode de payement",
        component: ModePayementDetailComponent,
        data: {
          menu: 'Mode de payement',
          sousmenu: 'Detail',
          role: []
        },
        canActivate: []
      },
      {
        path: '',
        title: "BSTP | Liste des mode de payements",
        component: ModePayementListComponent ,
        data: {
          menu: 'Mode de payement',
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
export class TypeDemandeRoutingModule { }
