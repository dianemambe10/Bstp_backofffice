import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'mode-payement', loadChildren: () => import('./mode-payement/mode-payement.module').then(m => m.ModePayementModule)
  },
  {
    path: 'paiement', loadChildren: () => import('./abonnement/abonnement.module').then(m => m.AbonnementModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaiementRoutingModule { }
