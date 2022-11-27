import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutoAvaliacaoPageRoutingModule } from './auto-avaliacao-routing.module';

import { AutoAvaliacaoPage } from './auto-avaliacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutoAvaliacaoPageRoutingModule
  ],
  declarations: [AutoAvaliacaoPage]
})
export class AutoAvaliacaoPageModule {}
