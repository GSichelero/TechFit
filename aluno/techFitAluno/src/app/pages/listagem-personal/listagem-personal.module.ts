import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListagemPersonalPageRoutingModule } from './listagem-personal-routing.module';

import { ListagemPersonalPage } from './listagem-personal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListagemPersonalPageRoutingModule
  ],
  declarations: [ListagemPersonalPage]
})
export class ListagemPersonalPageModule {}
