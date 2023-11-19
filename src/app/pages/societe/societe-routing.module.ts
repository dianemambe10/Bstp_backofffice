
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'acheteurs', loadChildren: () => import('./acheteur/acheteur.module').then(m => m.AcheteurModule)
  },
  {
    path: 'fournisseurs', loadChildren: () => import('./fournisseur/fournisseur.module').then(m => m.FournisseurModule)
  },
  {
    path: 'personne-contacts', loadChildren: () => import('./personne-contact/personne-contact.module').then(m => m.PersonneContactModule)
  },
  {
    path: 'type-societes', loadChildren: () => import('./type-societe/type-societe.module').then(m => m.TypeSocieteModule)
  },
  {
    path: 'domaines-activites', loadChildren: () => import('./domaine-activite/domaine-activite.module').then(m => m.DomaineActiviteModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocieteRoutingModule { }
