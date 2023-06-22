import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from './../../services/portfolio.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map, take } from 'rxjs';
import { Ieducacion } from 'src/app/interfaces/ieducacion';

@Component({
	selector: 'app-educacion',
	templateUrl: './educacion.component.html',
	styleUrls: ['./educacion.component.css']
})

// interface Ieducacion extends 

export class EducacionComponent implements OnInit {
	logopencil = "https://drive.google.com/uc?export=download&id=1jA2K7nPYax0JVefFmgn8HvsYre_25zie";
	logoadd = "https://drive.google.com/uc?export=download&id=11BKh21cSfuiTBDHbY26XH5Ux9TBVYdWm";
	logoedu = "https://drive.google.com/uc?export=download&id=1_TzJ4uPlPA_qU9DaaARLKqlLoXVi5pWu   ";
	logosave = "https://drive.google.com/uc?export=download&id=1QjXoDP0V0L7EHnjlfAx5bMFH2T-NbYU7";
	logocancel = "https://drive.google.com/uc?export=download&id=1DnHtyYLt7LgH7Nl6HsIOfSh2CDjNiYAE";
	logodelete = "https://drive.google.com/uc?export=download&id=1iW5i4HOltXKRwV0Q2qsJp6mrZvmFq0rw";
	// myPortfolio: any;
	// educacionList: any;
	modoEdicion: boolean = false;
	modoNuevoRegistro: boolean = false;
	i!: number;
	editID!: number;
	form: FormGroup;
	nombreColeccion = 'educacion';
	datosCollection!: AngularFirestoreCollection<any>;
	datosArray!: any[];
	datos!: Observable<Ieducacion[]>;
	numRegistros!: number;

	constructor(public portfolioData: PortfolioService, public firestore: AngularFirestore,
		private firebaseService: FirebaseService) {
		this.form = new FormGroup({
			escuela: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			titulo: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			imagen: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			carrera: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			puntaje: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			inicio: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			fin: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
		})
	}

	verificarYCrearMiColeccion(): void {
		const nombreColeccion = 'educacion';
		this.firebaseService.verificarYCrearColeccion('educacion',
		{
			escuela: '',
			titulo: '',
			imagen: '',
			carrera: '',
			puntaje: 100,
			inicio: '',
			fin:''
		});
	}

	getDatosArray(): void {
		this.datosCollection.snapshotChanges().pipe(
			map((snapshots) => {
				return snapshots.map((snapshot) => {
					const data = snapshot.payload.doc.data();
					const id = snapshot.payload.doc.id;
					return { id, ...data };
				});
			})
		).subscribe((array) => {
			this.datosArray = array;
			console.log('DEBUG: educacion getDatosArray', this.datosArray);
		})
	}
	// firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>.id: string
	getNumRegistros(): void {
		this.datosCollection?.get().subscribe((snapshot) => {
			this.numRegistros = snapshot.size;
			console.log("REG:", this.numRegistros);
		});
	}

	ngOnInit(): void {
		this.verificarYCrearMiColeccion();
		this.datosCollection = this.firestore.collection(this.nombreColeccion);
		this.datos = this.datosCollection.valueChanges();
		this.getDatosArray();
		this.getNumRegistros();

		//this.portfolioData.obtenerDatosEducacion().subscribe(data => {
		//JSON.stringify(data);
		//console.log("DATA-educacion JSON Datos Personales: " + JSON.stringify(data));
		//      console.log("data: ",data);
		//console.log("myPortfolio", this.myPortfolio);
		//});
	}


	agregarRegistro(): void {
		if (this.form.invalid) {
			return;
		}

		const nuevoRegistro = this.form.value;
		this.firestore.collection(this.nombreColeccion).add(nuevoRegistro)
			.then(() => {
				console.log('Registro agregado correctamente');
				this.form.reset();
			})
			.catch((error) => {
				console.error('Error al agregar el registro:', error);
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

	onCrear(event: Event) {
		console.log('Entra a onCrear');

		let objetoFormulario = this.form.controls;
		let keysForms = Object.keys(objetoFormulario);
		console.log("keysForm: ", keysForms);
		let valueForms = Object.values(objetoFormulario);
		console.log("valuesForm: ", valueForms);

		valueForms[0].setValue('');
		valueForms[1].setValue('');
		valueForms[2].setValue('');
		valueForms[3].setValue('');
		valueForms[4].setValue('');
		valueForms[5].setValue('');
		valueForms[6].setValue('');

		console.log("valueFormEscuela: ", valueForms[0].value);
		console.log("valueFormTitulo: ", valueForms[1].value);
		console.log("valueFormImagen: ", valueForms[2].value);
		console.log("valueFormCarrera: ", valueForms[3].value);
		console.log("valueFormPuntaje: ", valueForms[4].value);
		console.log("valueFormInicio: ", valueForms[5].value);
		console.log("valueFormFin: ", valueForms[6].value);

		this.modoNuevoRegistro = true;
		console.log('Sale de onCrear y modoNuevoRegistro =', this.modoNuevoRegistro);

	}

	onEdit(id: any, i: number, event: Event) {
		console.log('Entra a onEdit');

		this.editID = id;
		this.i = i;
		console.log("i", i);
		console.log("editID", this.editID);
		console.log("this.form.value: ", this.form.value);
		console.log("id: ", id);

		this.form.setValue({
			escuela: this.datosArray[i].escuela,
			titulo: this.datosArray[i].titulo,
			imagen: this.datosArray[i].imagen,
			carrera: this.datosArray[i].carrera,
			puntaje: this.datosArray[i].puntaje,
			inicio: this.datosArray[i].inicio,
			fin: this.datosArray[i].fin
		})
		console.log("this.form.value: ", this.form.value);
		this.modoEdicion = true;
	}

	onSaveEdit(event: Event) {
		event.preventDefault;
		// this.portfolioData.putEducacion(this.form.value, this.editID).subscribe(data => {
		console.log("this.form.value: ", this.form.value);
		console.log("id: ", this.editID);
		// console.log("EDUCACIÓN method PUT Data Editada", data);

		// this.portfolioData.obtenerOneDatosEducacion(this.editID).subscribe(data => {
		// console.log("Dato: " + JSON.stringify(data));
		// this.datosArray[this.i] = data;
		console.log("myPortfolio[i : ", this.datosArray[this.i]);
		// });

		// });
		this.modoEdicion = false;
	}

	onSaveNewNuevoRegistro(event: Event) {
		console.log('Entra a onSaveNewNuevoRegistro');

		event.preventDefault;
		this.datosCollection = this.firestore.collection(this.nombreColeccion);
		this.datos = this.datosCollection.valueChanges();
		this.getDatosArray();
		this.getNumRegistros();

		// this.datosArray.postEducacion(this.form.value).subscribe(data => {
		console.log("this.form.value: ", this.form.value);
		// console.log("AcercaDe method post Data", data);

		this.firestore.collection(this.nombreColeccion).add(this.form.value);
		// });


		this.modoNuevoRegistro = false;
		console.log('Sale de onSaveNewNuevoRegistro');

	}

	borrarRegistro(documentId: string) {
		console.log('DEBUG: borrarRegistro:', documentId);
		this.firestore.collection(this.nombreColeccion).doc(documentId).delete()
			.then(() => {
				console.log('Registro eliminado correctamente');
			})
			.catch((error) => {
				console.error('Error al eliminar el registro:', error);
			});
	}

	onDelete(i: number, event: Event) {
		this.i = i;
		this.modoEdicion = false;
		event.preventDefault;
		Swal.fire({
			title: `¿ELIMINAR EDUCACIÓN ${(this.datosArray[i].titulo).toUpperCase()}?`,
			text: "No podrá revertir los cambios.",
			icon: 'warning',
			confirmButtonColor: '#d33',
			confirmButtonText: 'Si, Eliminar.',
			showCancelButton: true,
			cancelButtonText: 'Cancelar',
			cancelButtonColor: '#00b5ff'
		})
			.then((result) => {
				if (result.isConfirmed) {
					// borrarRegistro(registroId: string): void {
					// this.firestore.collection(this.nombreColeccion).doc(registroId).delete()
					this.firestore.collection(this.nombreColeccion).doc(i.toString()).delete()
						.then(() => {
							console.log('Registro eliminado correctamente');
						})
						.catch((error) => {
							console.error('Error al eliminar el registro:', error);
						});
					//   }

				}
			}),
			Swal.fire({
				title: 'ITEM ELIMINADO',
				icon: 'success',
				showConfirmButton: false,
				timer: 1000
			});
		console.log("borrando registro");
	}

	onCancelNuevoRegistro() {
		this.modoNuevoRegistro = false;
	}

	onCancel(event: Event) {
		console.log('OnCancel');

		let objetoFormulario = this.form.controls;
		let keysForms = Object.keys(objetoFormulario);
		console.log("keysForm: ", keysForms);
		let valueForms = Object.values(objetoFormulario);
		console.log("valuesForm: ", valueForms);

		valueForms[0].setValue('');
		valueForms[1].setValue('');
		valueForms[2].setValue('');
		valueForms[3].setValue('');
		valueForms[4].setValue('');
		valueForms[5].setValue('');
		valueForms[6].setValue('');

		console.log("valueFormEscuela: ", valueForms[0].value);
		console.log("valueFormTitulo: ", valueForms[1].value);
		console.log("valueFormImagen: ", valueForms[2].value);
		console.log("valueFormCarrera: ", valueForms[3].value);
		console.log("valueFormPuntaje: ", valueForms[4].value);
		console.log("valueFormInicio: ", valueForms[5].value);
		console.log("valueFormFin: ", valueForms[6].value);
		this.modoEdicion = false;
	}
}
