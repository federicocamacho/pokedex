export interface Pokemon {
    name: string;
    image: string;
    types: string[];
    abilities: string[];
    baseExperience: number;
    height: number;
    id: number;
    moves: string[];
    order: number;
    stats: NameValue[];
    weight: number;
}

export interface NameValue {
    name: string;
    value: number;
}
