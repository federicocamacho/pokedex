export interface PokemonDetail {
  abilities: Ability[];
  base_experience: number;
  forms: NameUrl[];
  game_indices: GameIndex[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  species: NameUrl;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

interface Type {
  slot: number;
  type: NameUrl;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: NameUrl;
}

interface Sprites {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
  other: any;
  versions: any;
}

interface Move {
  move: NameUrl;
  version_group_details: VersionGroupDetail[];
}

interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: NameUrl;
  version_group: NameUrl;
}

interface GameIndex {
  game_index: number;
  version: NameUrl;
}

interface Ability {
  ability: NameUrl;
  is_hidden: boolean;
  slot: number;
}

interface NameUrl {
  name: string;
  url: string;
}
