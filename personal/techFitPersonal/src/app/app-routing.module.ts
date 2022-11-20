import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'listagem/semanas',
    loadChildren: () => import('./pages/listagem-semanas/listagem-semanas.module').then( m => m.ListagemSemanasPageModule)
  },
  {
    path: 'alteracao/treino',
    loadChildren: () => import('./pages/alteracao-treino/alteracao-treino.module').then( m => m.AlteracaoTreinoPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
