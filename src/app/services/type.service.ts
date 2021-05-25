import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Type } from '../interfaces/type.interface';
import { PokemonType } from '../interfaces/pokemon-type.interface';

@Injectable({
    providedIn: 'root'
})
export class TypeService {

    typos : string = "";

    constructor(private firestore : AngularFirestore) {}

    getTypes(type : Type) {
        return this.firestore.collection<Type>('Type').doc(""+type).valueChanges();
    }
}