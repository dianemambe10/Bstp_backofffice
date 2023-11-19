import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonneContactAddComponent } from './personne-contact-add/personne-contact-add.component';
import { PersonneContactEditComponent } from './personne-contact-edit/personne-contact-edit.component';
import { PersonneContactDetailComponent } from './personne-contact-detail/personne-contact-detail.component';
import { PersonneContactListComponent } from './personne-contact-list/personne-contact-list.component';


const routes: Routes = [
  {
    path: 'nouveau-personne-contact',
    title: "BSTP |  Ajout d'une personne de contact",
    component: PersonneContactAddComponent,
    data: {
      role: []
    },
    canActivate: []
  },
  {
    path: 'edit-personne-contact/:id',
    title: "BSTP | Modification d'une personne de contact",
    component: PersonneContactEditComponent,
    data: {
      role: []
    },
    canActivate: []
  },
  {
    path: 'details-personne-contact/:id',
    title: "BSTP | Detail d'une personne de contact",
    component: PersonneContactDetailComponent,
    data: {
      role: []
    },
    canActivate: []
  },
  {
    path: '',
    title: "BSTP |  Liste des personnes de contacts",
    component: PersonneContactListComponent,
    data: {
      role: []
    },
    canActivate: []
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonneContactRoutingModule { }
