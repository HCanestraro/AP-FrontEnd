// firebase.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { take } from 'rxjs/operators';
import { Observable, map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class FirebaseService {
	datosCollection!: AngularFirestoreCollection<any>;
	constructor(private firestore: AngularFirestore) { }
	
	verificarYCrearColeccion(nombreColeccion: string): void {
		this.firestore
			.collection(nombreColeccion)
			.get()
			.pipe(take(1))
			.subscribe((snapshot) => {
				if (snapshot.empty) {
					// La colección no existe, crearla
					this.firestore
						.collection(nombreColeccion)
						.add({ dummyData: 'valor_dummy' })
						.then(() => {
							console.log('Colección creada exitosamente: ',nombreColeccion);
						})
						.catch((error) => {
							console.error('Error al crear la colección:',nombreColeccion,' - ', error);
						});
				} else {
					console.log('La colección ya existe:',nombreColeccion);
				}
			},
				(error) => {
					console.error('Error al verificar la existencia de la colección:', error);
				});
	}
	
	getDatosArray(nombreColeccion: string): void {
		// datosCollection!: AngularFirestoreCollection<any>;
		this.datosCollection.snapshotChanges().pipe(
			map((snapshots) => {
				return snapshots.map((snapshot) => {
					const data = snapshot.payload.doc.data();
					const id = snapshot.payload.doc.id;
					return { id, ...data };
				});
			})
		).subscribe((array) => {
			return array;
			// this.datosArray = array;
			// console.log('DEBUG: getDatosArray', this.datosArray);
		})
	}

	getNumRegistros(nombreColeccion: string): void {
		this.datosCollection?.get().subscribe((snapshot) => {
			return snapshot.size;
			// this.numRegistros = snapshot.size;
			// console.log("REG:", this.numRegistros);
		});
	}
	modificarRegistro(nombreColeccion:string, documentId: string, nuevosDatos: any): void {
		this.firestore.collection(nombreColeccion).doc(documentId).update(nuevosDatos)
		  .then(() => {
			console.log('Registro modificado correctamente');
		  })
		  .catch((error) => {
			console.error('Error al modificar el registro:', error);
		  });
	  }

	  agregarRegistros(registros: any[]): void {
		const batch = this.firestore.firestore.batch();
	
		registros.forEach((registro) => {
		  const nuevoDocumentoRef = this.datosCollection.ref.doc();
		  batch.set(nuevoDocumentoRef, registro);
		});
	
		batch.commit()
		  .then(() => {
			console.log('Registros agregados correctamente');
		  })
		  .catch((error) => {
			console.error('Error al agregar los registros:', error);
		  });
	  }

}