import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  pokemonLoaded : boolean;
  typeLoaded : boolean;
  pokemonEvolutionLoaded : boolean;
  pokemonEvolve : boolean;

  constructor(private _pokemonService : PokemonService,
              private _pokemonTypeService : PokemonTypeService,
              private _typeService : TypeService,
              private _pokemonEvolutionService : PokemonEvolutionService,
              private activeModal: NgbActiveModal) {
                this.pokemonLoaded = false;
                this.typeLoaded = false;
                this.pokemonEvolutionLoaded = false;
                this.pokemonEvolve = true;
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
    const that = this;
    this._pokemonTypeService.getPokemonTypes(this.pokemonID).valueChanges().subscribe(getPokemonTypeData => {
      this.pokemon[0].PokemonTypes = getPokemonTypeData;
      this.pokemon[0].PokemonTypes.forEach(function(value, key) {
        that._typeService.getTypes(value.Type.toString()).get().subscribe(getTypeData => {
          that.pokemon[0].PokemonTypes[key]!.Type = getTypeData.data()!;
          that.typeLoaded = true;
        })
      });
    });
  }

  getPokemonEvolution() {
    const that = this;
    this._pokemonEvolutionService.getPokemonEvolution(this.pokemonID).valueChanges().subscribe(getPokemonEvolutionData => {
      this.pokemon[0].PokemonEvolution = getPokemonEvolutionData;
      if(this.pokemon[0].PokemonEvolution.length != 0)  {
        this.pokemon[0].PokemonEvolution.forEach(function(value, key) {
          that._pokemonService.getPokemonByID(value.Evolution.toString()).get().subscribe(getPokemonData => {
            that.pokemon[0].PokemonEvolution[key]!.Evolution = getPokemonData.data()!;
            that.pokemonEvolutionLoaded = true;
          });
        });
      } else {
        that.pokemonEvolutionLoaded = true;
        that.pokemonEvolve = false;
      }
    });
  }

  closeModal() {
    this.activeModal.close();
  }
}