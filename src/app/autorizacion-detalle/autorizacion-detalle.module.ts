import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { AutorizacionDetallePage } from './autorizacion-detalle.page';
import { EjecutantesComponent } from './ejecutantes/ejecutantes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: AutorizacionDetallePage
      }
    ])
  ],
  declarations: [AutorizacionDetallePage, EjecutantesComponent]
})
export class AutorizacionDetallePageModule {}
