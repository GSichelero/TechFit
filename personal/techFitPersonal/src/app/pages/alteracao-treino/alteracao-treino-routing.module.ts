import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlteracaoTreinoPage } from './alteracao-treino.page';

const routes: Routes = [
  {
    path: '',
    component: AlteracaoTreinoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlteracaoTreinoPageRoutingModule {}
