import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { Pokemon } from '../../../interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent implements OnInit {

  public listPokemon : Pokemon[] = [];
  pokemonLoaded : boolean;
  pokemonDetail : boolean;
  pokemonId : string = '';
  
  constructor(private _pokemonService : PokemonService) { 
    this.pokemonLoaded = false;
    this.pokemonDetail = false;
  }

  ngOnInit(): void {
    this._pokemonService.getPokemonList().subscribe(getPokemonData => {
      this.listPokemon = getPokemonData;
      this.pokemonLoaded = true;
    });
  }

  viewPokemonDetails(pokemonId : string) {
    this.pokemonId = pokemonId;
    this.pokemonDetail = !this.pokemonDetail;
  }
}