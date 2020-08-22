import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap, map, mergeAll, take, takeUntil, tap } from 'rxjs/operators';
import { Pokedex, PokemonInfo } from 'src/app/shared/models/pokedex.model';
import { Pokemon } from 'src/app/shared/models/pokemon.model';
import { PokedexApiService } from 'src/app/shared/services/pokedex-api.service';
import { PokedexService } from 'src/app/shared/services/pokedex.service';
import { Subscribable } from 'src/app/shared/utils/subscribable';

@Component({
  selector: 'pk-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent extends Subscribable implements OnInit {

  public pokemons: Pokemon[] = [];
  public page = 1;
  public offset = 50;

  constructor(private pokedexAPIService: PokedexApiService, private pokedexService: PokedexService) {
    super();
  }

  ngOnInit(): void {
    this.loadInitialInfo();
  }

  private loadPokemons(): Observable<PokemonInfo[]> {
    if (this.pokedexService.allPokemons) {
      return of(this.pokedexService.allPokemons);
    }

    return this.pokedexAPIService.getAllPokemons()
        .pipe(
          map((result: Pokedex) => result.results),
          tap((pokemons: PokemonInfo[]) => this.pokedexService.allPokemons = pokemons));
  }

  private loadInitialInfo(): void {
    this.loadPokemons()
      .pipe(
        mergeAll(),
        take(this.offset),
        concatMap((pokemonInfo: PokemonInfo) => this.loadPokemonInfo(pokemonInfo)),
        tap((pokemon: Pokemon) => this.pokemons.push(pokemon)),
        takeUntil(this.destroyed)
      )
      .subscribe((pokemon: Pokemon) => { console.log(pokemon)});
  }

  private loadPokemonInfo(pokemonInfo: PokemonInfo): Observable<Pokemon> {
    const cachedResult = this.pokedexService.pokemonDetail.get(pokemonInfo.name);

    if (cachedResult) {
      return of(cachedResult);
    }

    return this.pokedexAPIService.loadPokemon(pokemonInfo.url)
      .pipe(
        tap((pokemon: Pokemon) => this.pokedexService.pokemonDetail[pokemon.name] = pokemon));

  }

  public onScroll(): void {
    this.page++;
    const loadedPokemons = this.pokedexService.allPokemons
      .slice((this.page - 1) * this.offset, this.offset);

    of(loadedPokemons)
      .pipe(
        mergeAll(),
        concatMap((pokemonInfo: PokemonInfo) => this.loadPokemonInfo(pokemonInfo)),
        tap((pokemon: Pokemon) => this.pokemons.push(pokemon)),
        takeUntil(this.destroyed)
      )
      .subscribe((pokemon: Pokemon) => {});
  }


}
