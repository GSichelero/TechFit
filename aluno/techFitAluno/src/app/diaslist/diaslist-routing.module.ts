import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiaslistPage } from './diaslist.page';

const routes: Routes = [
  {
    path: '',
    component: DiaslistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiaslistPageRoutingModule {}
