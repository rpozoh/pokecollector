import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PokemonRegion } from '../interfaces/pokemon-region.interface';

@Injectable({
    providedIn: 'root'
})
export class PokemonRegionService {

    constructor(private firestore : AngularFirestore) {}

    getPokemonRegion(pokemon : string) {
        return this.firestore.collection<PokemonRegion>('Pokemon_Region', ref => ref.where("Pokemon", "==", pokemon));
    }
}