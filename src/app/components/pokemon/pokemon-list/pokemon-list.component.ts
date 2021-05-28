import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { PokemonTypeService } from '../../../services/pokemon-type.service';
import { PokemonEvolutionService } from '../../../services/pokemon-evolution.service';
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
  pokemonEvolutionLoaded : boolean;
  

  constructor(private _pokemonService : PokemonService,
              private _pokemonTypeService : PokemonTypeService,
              private _typeService : TypeService,
              private _pokemonEvolutionService : PokemonEvolutionService) { 
    this.pokemonLoaded = false;
    this.typeOneLoaded = false;
    this.typeTwoLoaded = false;
    this.pokemonEvolutionLoaded = false;
  }

  ngOnInit(): void {
    const that = this;
    this._pokemonService.getPokemonList().subscribe(getPokemonData => {
      this.listPokemon = getPokemonData;
      this.listPokemon.forEach(function(value, key) {
        that._pokemonTypeService.getPokemonTypes(value.id).valueChanges().subscribe(getPokemonTypeData => {
          that.listPokemon[key].PokemonTypes = getPokemonTypeData[0];
          that._typeService.getTypes(getPokemonTypeData[0].TypeOne.toString()).valueChanges().subscribe(getTypeOneData => {
            that.listPokemon[key].PokemonTypes.TypeOne = getTypeOneData!;
            that.typeOneLoaded = true;
          });
          if(that.listPokemon[key].PokemonTypes.TypeTwo) {
            that._typeService.getTypes(getPokemonTypeData[0].TypeTwo.toString()).valueChanges().subscribe(getTypeTwoData => {
              that.listPokemon[key].PokemonTypes.TypeTwo = getTypeTwoData!;
              that.typeTwoLoaded = true;
            });
          }
          that.pokemonLoaded = true;
        });
        that._pokemonEvolutionService.getPokemonEvolution(value.id).valueChanges().subscribe(getPokemonEvolutionData => {
          that.listPokemon[key].PokemonEvolution = getPokemonEvolutionData[0];
          if(that.listPokemon[key].PokemonEvolution) {
            that._pokemonService.getPokemon(that.listPokemon[key].PokemonEvolution.Evolution.toString()).get().subscribe(getPokemonData => {
              that.listPokemon[key].PokemonEvolution.Evolution = getPokemonData.data()!;
              that.pokemonEvolutionLoaded = true;
            });
          }
        });
      });
    });
  }

}
