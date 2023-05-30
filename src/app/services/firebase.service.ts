import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { take } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class FirebaseService {
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
							console.log('Colección creada exitosamente.');
						})
						.catch((error) => {
							console.error('Error al crear la colección:', error);
						});
				} else {
					console.log('La colección ya existe.');
				}
			},
				(error) => {
					console.error('Error al verificar la existencia de la colección:', error);
				});
	}
}