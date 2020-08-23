import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PokemonInfo } from '../models/pokedex.model';
import { Pokemon } from '../models/pokemon.model';
import { PokedexApiService } from './pokedex-api.service';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  public allPokemons: PokemonInfo[];
  public pokemonCount: number;
  public pokemonDetail: Map<string, Pokemon> = new Map();

  constructor(private pokedexAPIService: PokedexApiService) { }

  public loadPokemonInfo(pokemonInfo: PokemonInfo): Observable<Pokemon> {
    const cachedResult = this.pokemonDetail.get(pokemonInfo.name);
    if (cachedResult) {
      return of(cachedResult);
    }

    return this.pokedexAPIService.loadPokemon(pokemonInfo.url)
      .pipe(
        tap((pokemon: Pokemon) => this.pokemonDetail[pokemon.name] = pokemon)
      );
  }
}
