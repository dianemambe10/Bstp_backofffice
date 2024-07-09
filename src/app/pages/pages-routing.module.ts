import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule)
  },
  {
    path: 'societe', loadChildren: () => import('./societe/societe.module').then(m => m.SocieteModule)
  },
  {
    path: 'offre', loadChildren: () => import('./offre/offre.module').then(m => m.OffreModule)
  },
  {
    path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule)
  },
  {
    path: 'abonnement', loadChildren: () => import('./paiement/paiement.module').then(m => m.PaiementModule)
  },
   {
    path: 'learning', loadChildren: () => import('./learning/learning.module').then(m => m.LearningModule)
  },
  {
    path: 'forms', loadChildren: () => import('./forms/forms.module').then(m => m.FormModule)
  },
  {
    path: 'organismes', loadChildren: () => import('./institutions/institutions.module').then(m => m.InstitutionsModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
