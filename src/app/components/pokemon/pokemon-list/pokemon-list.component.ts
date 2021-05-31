import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { Pokemon } from '../../../interfaces/pokemon.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent implements OnInit {

  public listPokemon : Pokemon[] = [];
  pokemonLoaded : boolean;
  
  constructor(private _pokemonService : PokemonService,
              private router : Router) { 
    this.pokemonLoaded = false;
  }

  ngOnInit(): void {
    this._pokemonService.getPokemonList().subscribe(getPokemonData => {
      this.listPokemon = getPokemonData;
      this.pokemonLoaded = true;
    });
  }

  viewPokemonDetails(pokemonId : string) {
    this.router.navigate( ['/pokemon-detail'], { queryParams: { pokemonDocId : pokemonId }, skipLocationChange: true } );
  }
}