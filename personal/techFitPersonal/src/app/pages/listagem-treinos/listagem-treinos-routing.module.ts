import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListagemTreinosPage } from './listagem-treinos.page';

const routes: Routes = [
  {
    path: '',
    component: ListagemTreinosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListagemTreinosPageRoutingModule {}
