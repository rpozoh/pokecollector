import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PokemonEvolution } from '../interfaces/pokemon-evolution.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonEvolutionService {

  constructor(private firestore : AngularFirestore) { }

  getPokemonEvolution(pokemon : string) {
    return this.firestore.collection<PokemonEvolution>('Pokemon_Evolution', ref => ref.where("Pokemon", "==", pokemon));
  }
}
