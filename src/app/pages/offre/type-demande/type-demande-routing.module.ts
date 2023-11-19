import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeDemandeAddComponent } from './type-demande-add/type-demande-add.component';
import { TypeDemandeEditComponent } from './type-demande-edit/type-demande-edit.component';
import { TypeDemandeDetailComponent } from './type-demande-detail/type-demande-detail.component';
import { TypeDemandeListComponent } from './type-demande-list/type-demande-list.component';


const routes: Routes = [
  {
    path: '',
    title: "Les types de demandes",
    children: [
      {
        path: 'nouveau',
        title: "BSTP |  Ajout d'un type de demande",
        component: TypeDemandeAddComponent,
        data: {
          menu: 'Type de demande',
          sousmenu: 'Nouvelle',
          role: []
        },
        canActivate: []
      },
      {
        path: 'edit/:id',
        title: "BSTP | Modification d'un type de demande",
        component: TypeDemandeEditComponent,
        data: {
          menu: 'Type de demande',
          sousmenu: 'Edition',
          role: []
        },
        canActivate: []
      },
      {
        path: 'details/:id',
        title: "BSTP | Detail d'un type de demande",
        component: TypeDemandeDetailComponent,
        data: {
          menu: 'Type de demande',
          sousmenu: 'Detail',
          role: []
        },
        canActivate: []
      },
      {
        path: '',
        title: "BSTP | Liste des type de demandes",
        component: TypeDemandeListComponent,
        data: {
          menu: 'Type de demande',
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
