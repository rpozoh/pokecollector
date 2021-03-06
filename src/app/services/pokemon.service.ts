import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemonCollection: AngularFirestoreCollection<Pokemon>;
  pokemon: Observable<Pokemon[]>;

  constructor(private firestore : AngularFirestore) {
    this.pokemonCollection = this.firestore.collection<Pokemon>('Pokemon', ref => ref.orderBy('PokedexNumber', 'asc'));
    this.pokemon = this.pokemonCollection.snapshotChanges().pipe(map((changes => {
      return changes.map(pokemon => {
        var pokemonData = pokemon.payload.doc.data() as Pokemon;
        pokemonData.id = pokemon.payload.doc.id;
        return pokemonData;
      });
    })));
  }

  getPokemonList() {
    this.pokemonCollection = this.firestore.collection<Pokemon>('Pokemon', ref => ref.orderBy('PokedexNumber', 'asc'));
    this.pokemon = this.pokemonCollection.snapshotChanges().pipe(map((changes => {
      return changes.map(pokemon => {
        const pokemonData = pokemon.payload.doc.data() as Pokemon;
        pokemonData.id = pokemon.payload.doc.id;
        return pokemonData;
      });
    })));
    return this.pokemon;
  }

  getPokemonByID(pokemon : string) {
    return this.firestore.collection<Pokemon>('Pokemon').doc(pokemon);
  }
} 
