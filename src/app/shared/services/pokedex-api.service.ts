import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Pokedex } from '../models/pokedex.model';
import { PokemonDetail } from '../models/pokemon-detail.model';
import { Pokemon } from '../models/pokemon.model';
import { Util } from '../utils/util';

@Injectable({
  providedIn: 'root'
})
export class PokedexApiService {

  public results = 1048;

  constructor(private http: HttpClient) { }

  /**
   * Retrieves the list of Pokemons fom the Pokedex API.
   *
   * @param [offset=0] offset of the results.
   * @param [limit=50] amount of results to be retrieved.
   * @returns the search result as an Observable.
   */
  public getPokemons(offset: number = 0, limit: number = 50): Observable<Pokedex> {
    return this.http.get<Pokedex>(`${ environment.pokedexAPI}/pokemon?offset=${ offset }&limit=${ limit }`);
  }

  /**
   * Retrieves all the Pokemons from the Pokedex API
   *
   * @returns all the pokemons as an Observable.
   */
  public getAllPokemons(): Observable<Pokedex> {
    return this.getPokemons(0, this.results);
  }

  /**
   * Retrieves the information (in detail) about the pokemon.
   *
   * @param url of the request.
   * @returns the information of the Pokemon as an Observable.
   */
  public loadPokemon(url: string): Observable<Pokemon> {
    return this.http.get<PokemonDetail>(url)
      .pipe(map((detail: PokemonDetail) => Util.mapPokemonDetailToPokemon(detail)));
  }
}
