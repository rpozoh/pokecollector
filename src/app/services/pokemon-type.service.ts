import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PokemonType } from '../interfaces/pokemon-type.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonTypeService {

  constructor(private firestore : AngularFirestore) {}

getPokemonTypes(pokemon : string) {
    return this.firestore.collection<PokemonType>('Pokemon_Type', ref => ref.where("Pokemon", "==", pokemon).orderBy('Order', 'asc'));
  }
}
