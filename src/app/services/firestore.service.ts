import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService<T> {
	private collectionName: string;
	private collection: AngularFirestoreCollection<T>;

  	constructor( private afs: AngularFirestore ) {
		this.collectionName = 'tuColleccion';
		this.collection = this.afs.collection<T>(this.collectionName);
	 }

	 setCollection( collectionName: string): void {
		this.collectionName = collectionName;
		this.collection = this.afs.collection<T>(this.collectionName);
	 }

	 
	 getCollection(): AngularFirestoreCollection<T> {
		return this.collection;
	  }
	
	  getAll(): Observable<T[]> {
		return this.collection.valueChanges();
	  }
	
	  getById(id: string): Observable<T> {
		return this.collection.doc<T>(id).valueChanges();
	  }
	
	  add(item: T): Promise<DocumentReference<T>> {
		return this.collection.add(item);
	  }
	
	  update(id: string, data: Partial<T>): Promise<void> {
		return this.collection.doc<T>(id).update(data);
	  }
	
	  delete(id: string): Promise<void> {
		return this.collection.doc<T>(id).delete();
	  }
	
}
