import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvolucaoExercicioPageRoutingModule } from './evolucao-exercicio-routing.module';

import { EvolucaoExercicioPage } from './evolucao-exercicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvolucaoExercicioPageRoutingModule
  ],
  declarations: [EvolucaoExercicioPage]
})
export class EvolucaoExercicioPageModule {}
