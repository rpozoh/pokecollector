import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Type } from '../interfaces/type.interface';

@Injectable({
    providedIn: 'root'
})
export class TypeService {

    typeCollection: AngularFirestoreCollection<Type>;
    type: Observable<Type[]>;

    constructor(private firestore : AngularFirestore) {
        this.typeCollection = this.firestore.collection<Type>('Type');
        this.type = this.typeCollection.snapshotChanges().pipe(map((changes => {
            return changes.map(type => {
                var typeData = type.payload.doc.data() as Type;
                typeData.id = type.payload.doc.id;
                return typeData;
            });
        })));
    }

    getAllTypes() {
        this.typeCollection = this.firestore.collection<Type>('Type');
        this.type = this.typeCollection.snapshotChanges().pipe(map((changes => {
            return changes.map(type => {
                var typeData = type.payload.doc.data() as Type;
                typeData.id = type.payload.doc.id;
                return typeData;
            });
        })));
        return this.type;
    }

    getTypes(type : string) {
        return this.firestore.collection<Type>('Type').doc(type);
    }
}