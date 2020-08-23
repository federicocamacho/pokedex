import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, of } from 'rxjs';
import { concatMap, filter, map, mergeAll, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { PokemonInfo } from 'src/app/shared/models/pokedex.model';
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
  public search: string;
  public searchResult: Pokemon[] = [];
  public busy: boolean;

  constructor(
    private pokedexAPIService: PokedexApiService,
    private pokedexService: PokedexService,
    private route: ActivatedRoute) {
      super();
    }

  ngOnInit(): void {
    this.listenToSearch();
  }

  private loadPokemons(): Observable<Pokemon> {
    if (this.pokedexService.allPokemons && this.pokedexService.pokemonDetail.size === this.pokedexService.allPokemons.length) {
      // loaded all the information about all the pokemons
      return of(this.pokedexService.pokemonDetail.values())
        .pipe(
          mergeAll(),
          take(this.pokedexService.allPokemons.length));
    }

    const pokemonsToLoad = this.pokedexService.allPokemons ? of(this.pokedexService.allPokemons) : this.pokedexAPIService.getAllPokemons()
      .pipe(tap((pokemons: PokemonInfo[]) => {
        this.pokedexService.allPokemons = pokemons;
        this.pokedexService.pokemonCount = pokemons.length;
      }));

    return pokemonsToLoad
        .pipe(
          mergeAll(),
          concatMap((pokemonInfo: PokemonInfo) => this.loadPokemonInfo(pokemonInfo)),
        );
  }

  private showPokemon(pokemon: Pokemon): void {
    if (this.pokemons.length < this.offset) {
      this.pokemons.push(pokemon);
    }
  }

  private listenToSearch(): void {
    let searchRegExp: RegExp;
    this.route.queryParams
      .pipe(
        map((params: Params) => params.search),
        tap((search: string) => this.clearResults(search)),
        map((search: string) => !!search ? new RegExp(search, 'i') : null),
        tap((search: RegExp) => searchRegExp = search),
        switchMap(search => this.loadPokemons()),
        tap((pokemon: Pokemon) => {
          if (pokemon.name === this.pokedexService.allPokemons[this.pokedexService.pokemonCount - 1].name) {
            this.busy = false;
          }
        }),
        filter((pokemon: Pokemon) => this.filterPokemon(pokemon, searchRegExp)),
        tap((pokemon: Pokemon) => this.searchResult.push(pokemon)),
        takeUntil(this.destroyed)
      )
      .subscribe((pokemon: Pokemon) => {
        this.showPokemon(pokemon);
      });
  }

  private clearResults(search: string): void {
    this.busy = true;
    this.searchResult = [];
    this.pokemons = [];
    this.search = search;
  }

  private filterPokemon(pokemon: Pokemon, regExp: RegExp): boolean {
    if (!regExp) {
      return true;
    }

    return pokemon.name.search(regExp) !== -1 || pokemon.types.findIndex(type => regExp.test(type)) !== -1;
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
    if (!this.pokedexService.allPokemons || this.pokemons.length < this.offset) {
      return;
    }
    this.page++;
    const offset = (this.page - 1) * this.offset;

    let scrollObservable: Observable<Pokemon>;
    if (this.search) {
      scrollObservable = of(this.searchResult.slice(offset, offset + this.offset))
        .pipe(mergeAll());
    } else {
      const pokemons = this.pokedexService.allPokemons.slice(offset, offset + this.offset);
      scrollObservable = of(pokemons)
        .pipe(
          mergeAll(),
          concatMap((pokemonInfo: PokemonInfo) => this.loadPokemonInfo(pokemonInfo))
        );
    }

    scrollObservable
      .pipe(
        tap((pokemon: Pokemon) => this.pokemons.push(pokemon)),
        takeUntil(this.destroyed)
      )
      .subscribe((pokemon: Pokemon) => {});
  }
}
