import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvolucaoExercicioPage } from './evolucao-exercicio.page';

const routes: Routes = [
  {
    path: '',
    component: EvolucaoExercicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvolucaoExercicioPageRoutingModule {}
