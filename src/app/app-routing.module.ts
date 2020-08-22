import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './main/pages/auth/auth.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    },
    {
        path: 'pokedex',
        loadChildren: () => import('./pokedex/pokedex.module').then(p => p.PokedexModule),
        canLoad: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'pokedex'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
