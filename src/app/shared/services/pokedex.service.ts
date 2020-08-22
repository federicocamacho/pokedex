import { Injectable } from '@angular/core';
import { PokemonInfo } from '../models/pokedex.model';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  public allPokemons: PokemonInfo[];
  public pokemonDetail: Map<string, Pokemon> = new Map();

  constructor() { }
}
