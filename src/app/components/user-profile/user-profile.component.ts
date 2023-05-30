
import { Component, inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { UsersService } from './../../services/users.service';
import { ProfileUser } from './../../models/user';
import { Observable } from 'rxjs';

  
  @Component ({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
    collectionRef: AngularFirestoreCollection<unknown>;
    
    constructor(private us: UsersService,private firestore: AngularFirestore,private firestorec: AngularFirestoreCollection) {
        this.collectionRef = this.firestore.collection("users");;
        // const fakeStock = new AngularFirestoreCollection(this.collectionRef, query);
        
    }
    

    // NOTE!: the updates are performed on the reference not the query await fakeStock.add({ name: 'FAKE', price: 0.01 });
    
    // Subscribe to changes as snapshots. This provides you data updates as well as delta updates. fakeStock.valueChanges().subscribe(value => console.log(value));    
    // get(): Observable<Ipersona[]> { 
        // return this.personaCollection.valueChanges(); 
    // return this.personaCollection;

        
/* 
    getPersona(nombres: string) {
        this.firestore.docData(`persona/${id}`)
    } */
}
/* export Interface UserProfile {
    username: string;
} */

/* Reading data
In Cloud Firestore data is stored in documents and documents are stored in collections. The path to data follows <collection_name>/<document_id> and continues if there are subcollections. For example, "users/ABC1245/posts/XYZ6789" represents:

users collection
document id ABC12345
posts collection
document id XYZ6789
Let's explore reading data in Angular using the collection and collectionData functions. */