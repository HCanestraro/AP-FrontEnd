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
	camposAboutme = ([{ bannerImage: ''}, {profilePicture: ''},{ubication: ''}, {institution: ''},
	 	{institutionImage: ''}, {posicion: ''}, {descripcion: ''}, {bannerImage2: ''}, {profilePicture2: ''},
		{about: ''}, {company:<any>[]([{name:''},{url:''},{logo:''}])} ]);
	camposPersona = ([{ nombres: 'Hernan'},{ apellido: 'Canestraro'},{fecha_nacimiento: '09/27/76'},{nacionalidad: 'Argentino'},{mail:'hernancanestraro.dev@gmail.com'},{sobre_mi:'Autodidacta'},{ocupacion:'FullStack Developer Jr.'},{image_background_header:''},{image_perfil:''},{id_domicilio:'La Matanza, Buenos Aires, Argentina'}]);
	camposEducacion = ([{escuela:'E.E.M.Nº 24'},{titulo:'Bachiller contable'},{imagen:''},{carrera:'Bachiller'},{puntaje: 70},{inicio:'05/03/90'},{fin: '05/12/95'}]);
	camposExperiencia = ([{ubicacion:'Buenos Aires'},{puesto:'Data entry'},{periodo:''},{empresa:''},{actividades:''}]);
	camposSkills = ([{descripcion:'Descripción'}]);
	camposSoftskills = ([{name:''},{urlImage:''},{level:''}]);

	constructor(private firestore: AngularFirestore) { }
	verificarYCrearColeccion(nombreColeccion: string, campos: Array<any>[]): void {
		this.firestore
			.collection(nombreColeccion)
			.get()
			.pipe(take(1))
			.subscribe((snapshot) => {
				if (snapshot.empty) {
					// La colección no existe, crearla
					this.firestore
						.collection(nombreColeccion)
						// .add({ dummyData: 'valor_dummy' })
						.add(campos)
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

	  deleteRecord(nombreColeccion: string, documentId: string ) {
		console.log('DEBUG: borrarRegistro:', documentId);
		this.firestore.collection(nombreColeccion).doc(documentId).delete()
			.then(() => {
				console.log('Registro eliminado correctamente');
			})
			.catch((error) => {
				console.error('Error al eliminar el registro:', error);
			});
	  }
}