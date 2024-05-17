import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'thematique', loadChildren: () => import('./thematiques/thematiques.module').then(m => m.ThematiquesModule)
  },
  {
    path: 'formation', loadChildren: () => import('./formations/formations.module').then(m => m.FormationsModule)
  },
  {
    path: 'courses', loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule)
  },
  {
    path: 'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule)
  },
  {
    path: 'instructors', loadChildren: () => import('./instructors/instructors.module').then(m => m.InstructorsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningRoutingModule { }
