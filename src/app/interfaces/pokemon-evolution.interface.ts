import { Pokemon } from './pokemon.interface';

export interface PokemonEvolution {
    Pokemon : Pokemon;
    Evolution : Pokemon;
    Requeriment : string;
}