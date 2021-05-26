import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { PokemonTypeService } from '../../../services/pokemon-type.service';
import { TypeService } from '../../../services/type.service';
import { Pokemon } from '../../../interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent implements OnInit {

  public listPokemon : Pokemon[] = [];
  pokemonLoaded : boolean;
  typeOneLoaded : boolean;
  typeTwoLoaded : boolean;
  

  constructor(private _pokemonService : PokemonService,
              private _pokemonTypeService : PokemonTypeService,
              private _typeService : TypeService) { 
    this.pokemonLoaded = false;
    this.typeOneLoaded = false;
    this.typeTwoLoaded = false;
  }

  ngOnInit(): void {
    const that = this;
    this._pokemonService.getPokemonList().subscribe(getPokemonData => {
      this.listPokemon = getPokemonData;
      this.listPokemon.forEach(function(value, key) {
        that._pokemonTypeService.getPokemonTypes(value.id).valueChanges().subscribe(data => {
          that.listPokemon[key].Types = data[0];
          that._typeService.getTypes(data[0].TypeOne).subscribe(typeOne => {
            that.listPokemon[key].Types.TypeOne = typeOne!;
            that.typeOneLoaded = true;
          });
          if(that.listPokemon[key].Types.TypeTwo) {
            that._typeService.getTypes(data[0].TypeTwo).subscribe(typeTwo => {
              that.listPokemon[key].Types.TypeTwo = typeTwo!;
              that.typeTwoLoaded = true;
            });
          }
          that.pokemonLoaded = true;
        });
      });
    });
  }

}
