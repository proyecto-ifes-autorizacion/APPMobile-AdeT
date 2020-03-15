import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab1DetallesPage } from './tab1-detalles.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1DetallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab1DetallesPageRoutingModule {}
