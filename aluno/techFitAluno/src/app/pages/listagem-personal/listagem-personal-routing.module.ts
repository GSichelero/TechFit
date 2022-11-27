import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListagemPersonalPage } from './listagem-personal.page';

const routes: Routes = [
  {
    path: '',
    component: ListagemPersonalPage
  },
  {
    path: 'tela-personal',
    loadChildren: () => import('./tela-personal/tela-personal.module').then( m => m.TelaPersonalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListagemPersonalPageRoutingModule {}
