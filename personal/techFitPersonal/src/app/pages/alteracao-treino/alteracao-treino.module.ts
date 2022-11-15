import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlteracaoTreinoPageRoutingModule } from './alteracao-treino-routing.module';

import { AlteracaoTreinoPage } from './alteracao-treino.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlteracaoTreinoPageRoutingModule
  ],
  declarations: [AlteracaoTreinoPage]
})
export class AlteracaoTreinoPageModule {}
