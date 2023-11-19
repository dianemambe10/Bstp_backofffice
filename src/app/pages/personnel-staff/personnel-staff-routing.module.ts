import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonnelAddComponent } from 'src/app/personnel-staff/personnel-add/personnel-add.component';
import { PersonnelEditComponent } from './personnel-edit/personnel-edit.component';
import { PersonnelDetailComponent } from './personnel-detail/personnel-detail.component';
import { PersonnelListComponent } from './personnel-list/personnel-list.component';
import { PersonnelGridComponent } from './personnel-grid/personnel-grid.component';

const routes: Routes = [
  {
    path: '',
    title: "Les personnels staffs",
    children: [
      {
        path: 'nouveau',
        title: "BSTP |  Ajout d'un personnel staff",
        component: PersonnelAddComponent,
        data: {
          menu: 'Personnel',
          sousmenu: 'Nouveau',
          role: []
        },
        canActivate: []
      },
      {
        path: 'edit/:id',
        title: "BSTP | Modification d'un personnel staff",
        component: PersonnelEditComponent,
        data: {
          menu: 'Personnel',
          sousmenu: 'Edition',
          role: []
        },
        canActivate: []
      },
      {
        path: 'details/:id',
        title: "BSTP | Detail d'un personnel staff",
        component: PersonnelDetailComponent,
        data: {
          menu: 'Personnel',
          sousmenu: 'Detail',
          role: []
        },
        canActivate: []
      },
      {
        path: '',
        title: "BSTP | Liste des personnels staffs",
        component: PersonnelListComponent,
        data: {
          menu: 'Personnel',
          sousmenu: 'Liste',
          role: []
        },
        canActivate: []
      },
      {
        path: 'grid',
        title: "BSTP | Grille des personnels staffs",
        component: PersonnelGridComponent,
        data: {
          menu: 'Personnel',
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
export class PersonnelStaffRoutingModule { }
