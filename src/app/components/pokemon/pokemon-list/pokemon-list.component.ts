import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PokemonService } from '../../../services/pokemon.service';
import { PokemonRegionService } from '../../../services/pokemon-region.service';
import { RegionService } from '../../../services/region.service';
import { Pokemon } from '../../../interfaces/pokemon.interface';
import { PokemonDetailComponent } from './../pokemon-detail/pokemon-detail.component';
import { Region } from 'src/app/interfaces/region.interface';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent implements OnInit {

  public listPokemon : Pokemon[] = [];
  pokemonLoaded : boolean;
  pokemonRegionLoaded : boolean;
  pokemonDetail : boolean;
  
  constructor(private modalService: NgbModal,
              private _pokemonService : PokemonService,
              private _pokemonRegionService : PokemonRegionService,
              private _regionService : RegionService) { 
    this.pokemonLoaded = false;
    this.pokemonRegionLoaded = false;
    this.pokemonDetail = false;
  }

  ngOnInit(): void {
    this._pokemonService.getPokemonList().subscribe(getPokemonData => {
      this.listPokemon = getPokemonData;
      this.pokemonLoaded = true;
      this.getPokemonRegion();
    });
  }

  getPokemonRegion() {
    const that = this;
    this.listPokemon.forEach(function(value, key)  {
      that._pokemonRegionService.getPokemonRegion(value.id).valueChanges().subscribe(getPokemonRegionData => {
        that.listPokemon[key].PokemonRegion = getPokemonRegionData[0];
        that._regionService.getRegion(getPokemonRegionData[0].Region.toString()).valueChanges().subscribe(getRegionData => {
          that.listPokemon[key].PokemonRegion.Region = getRegionData!;
          that.pokemonRegionLoaded = true;
        })
      });
    });
  }

  viewPokemonDetails(pokemonId : string) {
    const modalRef = this.modalService.open(PokemonDetailComponent, { size: 'lg' });
    modalRef.componentInstance.pokemonID = pokemonId;
  }
}