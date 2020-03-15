import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab1DetallesPageRoutingModule } from './tab1-detalles-routing.module';

import { Tab1DetallesPage } from './tab1-detalles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab1DetallesPageRoutingModule
  ],
  declarations: [Tab1DetallesPage]
})
export class Tab1DetallesPageModule {}
