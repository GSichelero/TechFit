import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListagemSemanasPageRoutingModule } from './listagem-semanas-routing.module';

import { ListagemSemanasPage } from './listagem-semanas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListagemSemanasPageRoutingModule
  ],
  declarations: [ListagemSemanasPage]
})
export class ListagemSemanasPageModule {}
