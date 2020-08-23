export interface Pokemon {
    image: string;
    id: number;
    name: string;
    types: string[];
    height: number;
    weight: number;
    moves: string[];
}

export interface NameValue {
    name: string;
    value: number;
}
