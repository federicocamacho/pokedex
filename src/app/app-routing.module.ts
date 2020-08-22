import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './main/pages/login/login.component';
import { SigninComponent } from './main/pages/signin/signin.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path:  'signin',
        component: SigninComponent
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
