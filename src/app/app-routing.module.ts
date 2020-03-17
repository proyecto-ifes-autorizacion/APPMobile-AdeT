import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'autorizacion-lista',
    loadChildren: () => import('./autorizacion-lista/autorizacion-lista.module').then( m => m.AutorizacionListaPageModule)
  },
  {
    path: 'autorizacion-detalle/:autorizacionId',
    loadChildren: () => import('./autorizacion-detalle/autorizacion-detalle.module').then( m => m.AutorizacionDetallePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'autorizacion-cancelar/:autorizacionId',
    loadChildren: () => import('./autorizacion-cancelar/autorizacion-cancelar.module').then( m => m.AutorizacionCancelarPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
