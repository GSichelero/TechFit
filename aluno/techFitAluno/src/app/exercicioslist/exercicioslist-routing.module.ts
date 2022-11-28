import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExercicioslistPage } from './exercicioslist.page';

const routes: Routes = [
  {
    path: '',
    component: ExercicioslistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExercicioslistPageRoutingModule {}
