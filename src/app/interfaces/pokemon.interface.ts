import { PokemonEvolution } from "./pokemon-evolution.interface";
import { PokemonType } from "./pokemon-type.interface";

export interface Pokemon {
    id : string;
    Name : string;
    Description : string;
    PokedexNumber : number;
    Movements : string;
    Image : string;
    PokemonTypes : PokemonType;
    PokemonEvolution : PokemonEvolution;
}