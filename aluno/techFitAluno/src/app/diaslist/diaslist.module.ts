import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiaslistPageRoutingModule } from './diaslist-routing.module';

import { DiaslistPage } from './diaslist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiaslistPageRoutingModule
  ],
  declarations: [DiaslistPage]
})
export class DiaslistPageModule {}
