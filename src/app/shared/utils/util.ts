import { PokemonDetail, Stat } from '../models/pokemon-detail.model';
import { NameValue, Pokemon } from '../models/pokemon.model';

export class Util {
    public static mapPokemonDetailToPokemon(detail: PokemonDetail): Pokemon {
        return {
           name: detail.name,
           image: detail.sprites.front_default,
           types: detail.types.map(type => type.type.name),
           abilities: detail.abilities
             .filter(ability => !ability.is_hidden)
             .map(ability => ability.ability.name),
           baseExperience: detail.base_experience,
           height: detail.height,
           id: detail.id,
           moves: detail.moves.map(move => move.move.name),
           order: detail.order,
           stats: detail.stats.map(stat => Util.mapStat(stat)),
           weight: detail.weight
        };
     }

    public static mapStat(stat: Stat): NameValue {
        return {
            name: stat.stat.name,
            value: stat.base_stat
        };
    }
}
