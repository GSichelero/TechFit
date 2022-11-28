import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { SecureInnerPagesGuard } from './shared/secure-inner-pages.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login/cadastro',
    loadChildren: () => import('./pages/cadastro/cadastro.module').then( m => m.CadastroPageModule),
    canActivate: [SecureInnerPagesGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [SecureInnerPagesGuard],
  },
  {
    path: 'listagem/semanas',
    loadChildren: () => import('./pages/listagem-semanas/listagem-semanas.module').then( m => m.ListagemSemanasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'alteracao/treino',
    loadChildren: () => import('./pages/alteracao-treino/alteracao-treino.module').then( m => m.AlteracaoTreinoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pages/pedidos/pedidos.module').then( m => m.PedidosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'listagem/treinos',
    loadChildren: () => import('./pages/listagem-treinos/listagem-treinos.module').then( m => m.ListagemTreinosPageModule)
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
