import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListagemSemanasPage } from './listagem-semanas.page';

const routes: Routes = [
  {
    path: '',
    component: ListagemSemanasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListagemSemanasPageRoutingModule {}
