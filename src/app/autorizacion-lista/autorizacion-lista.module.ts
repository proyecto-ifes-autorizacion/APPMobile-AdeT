import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { AutorizacionListaPage } from './autorizacion-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: AutorizacionListaPage
      }
    ])
  ],
  declarations: [AutorizacionListaPage]
})
export class AutorizacionListaPageModule {}
