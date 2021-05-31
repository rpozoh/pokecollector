import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../../services/pokemon.service';
import { PokemonTypeService } from '../../../services/pokemon-type.service';
import { PokemonEvolutionService } from '../../../services/pokemon-evolution.service';
import { TypeService } from '../../../services/type.service';
import { Pokemon } from '../../../interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
})
export class PokemonDetailComponent implements OnInit {
  
  @Input() pokemonID : string = '';

  pokemon : Pokemon[] = [];
  pokemonName : string = '';
  routerLinkAddress : string = '/pokemon';
  pokemonLoaded : boolean;
  typesLoaded : boolean;
  pokemonEvolutionLoaded : boolean;

  constructor(private activatedRoute : ActivatedRoute,
              private _pokemonService : PokemonService,
              private _pokemonTypeService : PokemonTypeService,
              private _typeService : TypeService,
              private _pokemonEvolutionService : PokemonEvolutionService,) {
                this.pokemonLoaded = false;
                this.typesLoaded = false;
                this.pokemonEvolutionLoaded = false;
                this.activatedRoute.params.subscribe( pokemonName => {
                  this.pokemonName = pokemonName['name'];
                });
               }

  ngOnInit(): void {
    this._pokemonService.getPokemonByID(this.pokemonID).valueChanges().subscribe(getPokemonData => {
      this.pokemon[0] = getPokemonData!;
      this.pokemonLoaded = true;
    });

    this.getPokemonTypes();

    this.getPokemonEvolution();
  }

  getPokemonTypes() {
    this._pokemonTypeService.getPokemonTypes(this.pokemonID).valueChanges().subscribe(getPokemonTypeData => {
      this.pokemon[0].PokemonTypes = getPokemonTypeData[0];
      this._typeService.getTypes(getPokemonTypeData[0].TypeOne.toString()).valueChanges().subscribe(getTypeOneData => {
        this.pokemon[0].PokemonTypes.TypeOne = getTypeOneData!;
      });
      if(this.pokemon[0].PokemonTypes.TypeTwo) {
        this._typeService.getTypes(getPokemonTypeData[0].TypeTwo.toString()).valueChanges().subscribe(getTypeTwoData => {
          this.pokemon[0].PokemonTypes!.TypeTwo = getTypeTwoData!;
        });
      }
      this.typesLoaded = true;
    });
  }

  getPokemonEvolution() {
    this._pokemonEvolutionService.getPokemonEvolution(this.pokemonID).valueChanges().subscribe(getPokemonEvolutionData => {
      this.pokemon[0].PokemonEvolution = getPokemonEvolutionData[0];
      if(this.pokemon[0].PokemonEvolution) {
        this._pokemonService.getPokemonByID(this.pokemon[0].PokemonEvolution.Evolution.toString()).get().subscribe(getPokemonData => {
          this.pokemon[0].PokemonEvolution!.Evolution = getPokemonData.data()!;
        });
      }
      this.pokemonEvolutionLoaded = true;
    });
  }
}