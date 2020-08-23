import { NameUrl } from './pokemon-detail.model';

export interface Pokemon {
    image: string;
    id: number;
    name: string;
    types: string[];
    height: number;
    weight: number;
    moves: string[];
    species: NameUrl;
    evolutionChain?: NameUrl[];
}

export interface NameValue {
    name: string;
    value: number;
}

export interface EvolutionChain {
    evolution_details: any[];
    evolves_to: EvolutionChain[];
    is_baby: boolean;
    species: NameUrl;
}

export interface EvolutionChainDetail {
    chain: EvolutionChain;
    id: number;
}
