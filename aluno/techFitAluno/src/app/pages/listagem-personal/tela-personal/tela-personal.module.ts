import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TelaPersonalPageRoutingModule } from './tela-personal-routing.module';

import { TelaPersonalPage } from './tela-personal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TelaPersonalPageRoutingModule
  ],
  declarations: [TelaPersonalPage]
})
export class TelaPersonalPageModule {}
