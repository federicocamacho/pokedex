import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './main/pages/auth/auth.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { PokedexGuard } from './shared/guards/pokedex.guard';

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        loadChildren: () => import('./main/main.module').then(m => m.MainModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'pokedex',
        loadChildren: () => import('./pokedex/pokedex.module').then(p => p.PokedexModule),
        canLoad: [PokedexGuard],
        canActivateChild: [PokedexGuard]
    },
    {
        path: '**',
        redirectTo: '/pokedex'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
