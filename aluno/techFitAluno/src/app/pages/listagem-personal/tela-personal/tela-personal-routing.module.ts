import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TelaPersonalPage } from './tela-personal.page';

const routes: Routes = [
  {
    path: '',
    component: TelaPersonalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TelaPersonalPageRoutingModule {}
