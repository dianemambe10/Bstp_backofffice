import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'organismes', loadChildren: () => import('./instituts/instituts.module').then(m => m.InstitutsModule)
  },
  {
    path: 'type-organismes', loadChildren: () => import('./type-instituts/type-instituts.module').then(m => m.TypeInstitutsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstitutionsRoutingModule { }
