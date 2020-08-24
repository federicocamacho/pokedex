import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared/shared.module';
import { InfiniteScrollComponent } from './components/infinite-scroll/infinite-scroll.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { HomeComponent } from './pages/home/home.component';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { PokedexRoutingModule } from './pokedex-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [PokedexComponent, PokemonComponent, HomeComponent, PokemonCardComponent, InfiniteScrollComponent, ProfileComponent],
  imports: [
    CommonModule,
    PokedexRoutingModule,
    SharedModule,
    MatToolbarModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ]
})
export class PokedexModule { }
