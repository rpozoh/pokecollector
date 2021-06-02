import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PokemonService } from '../../../services/pokemon.service';
import { Pokemon } from '../../../interfaces/pokemon.interface';
import { PokemonDetailComponent } from './../pokemon-detail/pokemon-detail.component';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent implements OnInit {

  public listPokemon : Pokemon[] = [];
  pokemonLoaded : boolean;
  pokemonDetail : boolean;
  
  constructor(private modalService: NgbModal,
              private _pokemonService : PokemonService) { 
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
    const modalRef = this.modalService.open(PokemonDetailComponent, { size: 'xl' });
    modalRef.componentInstance.pokemonID = pokemonId;
  }
}