import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Type } from '../interfaces/type.interface';

@Injectable({
    providedIn: 'root'
})
export class TypeService {

    typos : string = "";

    constructor(private firestore : AngularFirestore) {}

    getTypes(type : string) {
        return this.firestore.collection<Type>('Type').doc(type);
    }
}