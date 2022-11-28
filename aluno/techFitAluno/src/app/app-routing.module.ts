import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { SecureInnerPagesGuard } from './shared/secure-inner-pages.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login/cadastro',
    loadChildren: () => import('./pages/cadastro/cadastro.module').then( m => m.CadastroPageModule),
    canActivate: [SecureInnerPagesGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [SecureInnerPagesGuard],
  },
  {
    path: 'auto-avaliacao',
    loadChildren: () => import('./auto-avaliacao/auto-avaliacao.module').then( m => m.AutoAvaliacaoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-post',
    loadChildren: () => import('./add-post/add-post.module').then( m => m.AddPostPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-post',
    loadChildren: () => import('./edit-post/edit-post.module').then( m => m.EditPostPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'listagem-personal',
    loadChildren: () => import('./pages/listagem-personal/listagem-personal.module').then( m => m.ListagemPersonalPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'diaslist',
    loadChildren: () => import('./diaslist/diaslist.module').then( m => m.DiaslistPageModule)
  },
  {
    path: 'exercicioslist',
    loadChildren: () => import('./exercicioslist/exercicioslist.module').then( m => m.ExercicioslistPageModule)
  },
  {
    path: 'evolucao-exercicio',
    loadChildren: () => import('./evolucao-exercicio/evolucao-exercicio.module').then( m => m.EvolucaoExercicioPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
