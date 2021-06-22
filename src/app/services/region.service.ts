import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Region } from '../interfaces/region.interface';

@Injectable({
    providedIn: 'root'
})
export class RegionService {

    regionCollection: AngularFirestoreCollection<Region>;
    region: Observable<Region[]>;

    constructor(private firestore : AngularFirestore) {
        this.regionCollection = this.firestore.collection<Region>('Region');
        this.region = this.regionCollection.snapshotChanges().pipe(map((changes => {
            return changes.map(region => {
                var regionData = region.payload.doc.data() as Region;
                regionData.id = region.payload.doc.id;
                return regionData;
            });
        })));
    }

    getAllRegions() {
        this.regionCollection = this.firestore.collection<Region>('Region', ref => ref.orderBy('Generation', 'asc'));
        this.region = this.regionCollection.snapshotChanges().pipe(map((changes => {
            return changes.map(region => {
                var regionData = region.payload.doc.data() as Region;
                regionData.id = region.payload.doc.id;
                return regionData;
            });
        })));
        return this.region;
    }

    getRegion(region : string) {
        return this.firestore.collection<Region>('Region').doc(region);
    }
}