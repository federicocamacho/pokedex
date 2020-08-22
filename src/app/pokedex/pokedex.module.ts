import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { PokedexRoutingModule } from './pokedex-routing.module';
import { HomeComponent } from './pages/home/home.component';



@NgModule({
  declarations: [PokedexComponent, PokemonComponent, HomeComponent],
  imports: [
    CommonModule,
    PokedexRoutingModule
  ]
})
export class PokedexModule { }
