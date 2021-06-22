import { Pokemon } from './pokemon.interface';
import { Type } from './type.interface';

export interface PokemonType {
    Pokemon : Pokemon;
    Type : Type;
    Order : number;
}