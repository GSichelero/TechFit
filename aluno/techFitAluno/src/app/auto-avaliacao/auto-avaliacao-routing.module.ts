import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutoAvaliacaoPage } from './auto-avaliacao.page';

const routes: Routes = [
  {
    path: '',
    component: AutoAvaliacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutoAvaliacaoPageRoutingModule {}
