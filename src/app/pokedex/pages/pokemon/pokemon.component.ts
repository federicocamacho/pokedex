import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map, mergeAll, switchMap, tap } from 'rxjs/operators';
import { PokemonInfo, Specie } from 'src/app/shared/models/pokedex.model';
import { NameUrl } from 'src/app/shared/models/pokemon-detail.model';
import { EvolutionChain, EvolutionChainDetail, Pokemon } from 'src/app/shared/models/pokemon.model';
import { MessageService } from 'src/app/shared/services/message.service';
import { PokedexApiService } from 'src/app/shared/services/pokedex-api.service';
import { PokedexService } from 'src/app/shared/services/pokedex.service';
import { Subscribable } from 'src/app/shared/utils/subscribable';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'pk-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent extends Subscribable implements OnInit {

  public pokemon: Pokemon;
  public evolutionChain: NameUrl[] = [];
  public notFound: boolean;

  constructor(
    private route: ActivatedRoute,
    private pokedexService: PokedexService,
    private pokedexAPIService: PokedexApiService,
    private router: Router,
    private messageService: MessageService) {
      super();
    }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: Params) => params.pokemonName),
        map((name: string) => ({ name, url: `${ environment.pokedexAPI }/pokemon/${ name }`})),
        switchMap((pokemon: PokemonInfo) => this.pokedexService.loadPokemonInfo(pokemon)),
        tap((pokemon: Pokemon) => this.setCurrent(pokemon)),
        concatMap((pokemon: Pokemon) => this.getEvolutionChain(pokemon)),
        catchError(err => this.handleSearchError(err))
      )
      .subscribe((evolution: NameUrl) => this.evolutionChain.push(evolution));
  }

  private handleSearchError(err: any): Observable<NameUrl> {
    if (err instanceof HttpErrorResponse) {
      const error = err as HttpErrorResponse;
      if (error.status === 404) {
        this.notFound = true;
      } else {
        this.messageService.showError('No se pudo cargar la información del pokemon: ' + error.message);
      }
    }

    return of(null);
  }

  public goBack(): void {
    this.router.navigate(['/pokedex']);
  }

  public goToPokemon(name: string) {
    this.router.navigate(['/pokedex', name]);
  }

  private setCurrent(pokemon: Pokemon): void {
    this.notFound = false;
    this.pokemon = pokemon;
    this.evolutionChain = [];
  }

  private getEvolutionChain(pokemon: Pokemon) {
    return this.pokedexAPIService.getSpecie(pokemon.species.url)
      .pipe(
        map((specie: Specie) => specie.evolution_chain.url),
        concatMap((evolutionChainUrl: string) => this.pokedexAPIService
          .getEvolutionChain(evolutionChainUrl)
        ),
        map((chainDetail: EvolutionChainDetail) => chainDetail.chain),
        concatMap((chain: EvolutionChain) => {
          const evolutionChain: NameUrl[] = [];
          evolutionChain.push(chain.species);
          let currentChain = [ chain ];
          while (this.hasMoreEvolutions(currentChain)) {
            currentChain = currentChain[0].evolves_to;
            evolutionChain.push(currentChain[0].species);
          }
          return of(evolutionChain);
        }),
        mergeAll(),
        concatMap((evolution) => this.pokedexService.loadPokemonInfo({
          name: evolution.name,
          url: `${ environment.pokedexAPI }/pokemon/${ evolution.name }`
        })),
        map((evolution: Pokemon) => ({ name: evolution.name, url: evolution.image })),
      );

  }

  private hasMoreEvolutions(chain: EvolutionChain[]): boolean {
    return chain && chain[0].evolves_to && chain[0].evolves_to.length > 0;
  }

}
