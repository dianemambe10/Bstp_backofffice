import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'demande', loadChildren: () => import('./demande/demande.module').then(m => m.DemandeModule)
  },
  {
    path: 'type-demande', loadChildren: () => import('./type-demande/type-demande.module').then(m => m.TypeDemandeModule)
  },
  {
    path: 'contrat', loadChildren: () => import('./contrat/contrat.module').then(m => m.ContratModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffreRoutingModule { }
