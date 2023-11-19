import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { AnalyticsComponent } from './analytics/analytics.component';
import { CrmComponent } from './crm/crm.component';
import { IndexComponent } from './index/index.component';
import { LearningComponent } from './learning/learning.component';
import { RealEstateComponent } from './real-estate/real-estate.component';


const routes: Routes = [
  {
    path: "",
    title: "BSTP |  Tableau de bord",
    component: IndexComponent
  },
  {
    path: "analytics",
    title: "BSTP |  Tableau de bord",
    component: AnalyticsComponent
  },
  {
    path: "crm",
    title: "BSTP |  Tableau de bord",
    component: CrmComponent
  },
  {
    path: "learning",
    title: "BSTP |  Tableau de bord",
    component: LearningComponent
  },
  {
    path: "real-estate",
    title: "BSTP |  Tableau de bord",
    component: RealEstateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardsRoutingModule { }
