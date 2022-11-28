import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListagemTreinosPageRoutingModule } from './listagem-treinos-routing.module';

import { ListagemTreinosPage } from './listagem-treinos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListagemTreinosPageRoutingModule
  ],
  declarations: [ListagemTreinosPage]
})
export class ListagemTreinosPageModule {}
