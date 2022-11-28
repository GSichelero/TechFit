import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExercicioslistPageRoutingModule } from './exercicioslist-routing.module';

import { ExercicioslistPage } from './exercicioslist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExercicioslistPageRoutingModule
  ],
  declarations: [ExercicioslistPage]
})
export class ExercicioslistPageModule {}
