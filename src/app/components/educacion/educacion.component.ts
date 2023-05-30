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
	myPortfolio: any;
	educacionList: any;
	modoEdicion: boolean = false;
	modoNuevoRegistro: boolean = false;
	i!: number;
	editID!: number;
	form: FormGroup;
	nombreColeccion = 'educacion';
	datosCollection: AngularFirestoreCollection<any>;
	datosArray!: any[];
	datos: Observable<Ieducacion[]>;
	numRegistros!: number;

	constructor(public portfolioData: PortfolioService, public firestore: AngularFirestore,
		private firebaseService: FirebaseService) {
		this.form = new FormGroup({
			escuela: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			titulo: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			imagen: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			carrera: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			pontaje: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			inicio: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			fin: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
		})

		this.datosCollection = this.firestore.collection(this.nombreColeccion);
		this.datos = this.datosCollection.valueChanges();
		this.getDatosArray();
		this.getNumRegistros();
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
			console.log('DEBUG: getDatosArray',this.datosArray);
		})
	}

	getNumRegistros(): void {
		this.datosCollection?.get().subscribe((snapshot) => {
			this.numRegistros = snapshot.size;
			console.log("REG:", this.numRegistros);
		});
	}
	
	verificarYCrearMiColeccion():void {
		this.firebaseService.verificarYCrearColeccion(this.nombreColeccion);
	}

	ngOnInit(): void {
		this.portfolioData.getdata().subscribe(data => {
			this.educacionList = data.educacion;
			this.myPortfolio = data.educacion;
			console.log("DATA-educacion", this.myPortfolio);
		})
		//this.portfolioData.obtenerDatosEducacion().subscribe(data => {
		//JSON.stringify(data);
		//console.log("DATA-educacion JSON Datos Personales: " + JSON.stringify(data));
		//      console.log("data: ",data);
		//console.log("myPortfolio", this.myPortfolio);
		//});
	}

	onCrear(event: Event) {
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

	}

	onEdit(id: any, i: number, event: Event) {
		this.editID = id;
		this.i = i;
		console.log("i", i);
		console.log("editID", this.editID);
		console.log("this.form.value: ", this.form.value);
		console.log("id: ", id);

		this.form.setValue({
			escuela: this.myPortfolio[i].escuela,
			titulo: this.myPortfolio[i].titulo,
			imagen: this.myPortfolio[i].imagen,
			carrera: this.myPortfolio[i].carrera,
			puntaje: this.myPortfolio[i].puntaje,
			inicio: this.myPortfolio[i].inicio,
			fin: this.myPortfolio[i].fin
		})
		console.log("this.form.value: ", this.form.value);
		this.modoEdicion = true;
	}

	onSaveEdit(event: Event) {
		event.preventDefault;
		this.portfolioData.putEducacion(this.form.value, this.editID).subscribe(data => {
			console.log("this.form.value: ", this.form.value);
			console.log("id: ", this.editID);
			console.log("EDUCACIÓN method PUT Data Editada", data);

			this.portfolioData.obtenerOneDatosEducacion(this.editID).subscribe(data => {
				console.log("Dato: " + JSON.stringify(data));
				this.myPortfolio[this.i] = data;
				console.log("myPortfolio[i : ", this.myPortfolio[this.i]);
			});

		});
		this.modoEdicion = false;
	}

	onSaveNewNuevoRegistro(event: Event) {
		event.preventDefault;
		this.portfolioData.postEducacion(this.form.value).subscribe(data => {
			console.log("this.form.value: ", this.form.value);
			console.log("AcercaDe method post Data", data);

			this.portfolioData.obtenerDatosEducacion().subscribe(data => {
				this.myPortfolio = data;
			});
		});

		this.modoNuevoRegistro = false;
	}

	onDelete(i: number, event: Event) {
		this.i = i;
		this.modoEdicion = false;
		event.preventDefault;
		Swal.fire({
			title: `¿ELIMINAR EDUCACIÓN ${(this.myPortfolio[i].titulo).toUpperCase()}?`,
			text: "No podrá revertir los cambios.",
			icon: 'warning',
			confirmButtonColor: '#d33',
			confirmButtonText: 'Si, Eliminar.',
			showCancelButton: true,
			cancelButtonText: 'Cancelar',
			cancelButtonColor: '#00b5ff'
		}).then((result) => {
			if (result.isConfirmed) {
				this.portfolioData.deleteEducacion(this.myPortfolio[i].id).subscribe(data => {
					console.log("Borrando registro", data);

					this.portfolioData.obtenerDatosEducacion().subscribe(data => {
						this.myPortfolio = data;
					});

				});
				Swal.fire({
					title: 'ITEM ELIMINADO',
					icon: 'success',
					showConfirmButton: false,
					timer: 1000
				})
			}
			console.log("borrando registro");

		})
	}

	onCancelNuevoRegistro() {
		this.modoNuevoRegistro = false;
	}

	onCancel(event: Event) {
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
