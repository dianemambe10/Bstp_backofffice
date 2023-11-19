import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleAddComponent } from './role-add/role-add.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { RoleListComponent } from './role-list/role-list.component';

const routes: Routes = [
  {
    path: '',
    title: "Les roles",
    children: [
      {
        path: 'nouveau',
        title: "BSTP |  Ajout d'un role",
        component: RoleAddComponent,
        data: {
          menu: 'Role',
          sousmenu: 'Nouveau',
          role: []
        },
        canActivate: []
      },
      {
        path: 'edit/:id',
        title: "BSTP | Modification d'un role",
        component: RoleEditComponent,
        data: {
          menu: 'Role',
          sousmenu: 'Edition',
          role: []
        },
        canActivate: []
      },
      {
        path: 'details/:id',
        title: "BSTP | Detail d'un role",
        component: RoleDetailComponent,
        data: {
          menu: 'Role',
          sousmenu: 'Detail',
          role: []
        },
        canActivate: []
      },
      {
        path: '',
        title: "BSTP | Liste des roles",
        component: RoleListComponent,
        data: {
          menu: 'Role',
          sousmenu: 'Liste',
          role: []
        },
        canActivate: []
      }


    ],
    canActivate: []
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
