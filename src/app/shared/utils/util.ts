import { PokemonDetail, Stat } from '../models/pokemon-detail.model';
import { NameValue, Pokemon } from '../models/pokemon.model';

export class Util {
    public static mapPokemonDetailToPokemon(detail: PokemonDetail): Pokemon {
        return {
           name: detail.name,
           image: detail.sprites?.front_default,
           types: detail.types?.map(type => type.type.name),
           height: detail.height,
           id: detail.id,
           moves: detail.moves?.map(move => move.move.name),
           weight: detail.weight,
           species: detail.species
        };
     }

    public static mapStat(stat: Stat): NameValue {
        return {
            name: stat.stat.name,
            value: stat.base_stat
        };
    }
}
