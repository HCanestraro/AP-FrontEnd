import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from './../../services/portfolio.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map, take } from 'rxjs';
import { Iskills } from 'src/app/interfaces/iskills';
@Component({
	selector: 'app-skills',
	templateUrl: './skills.component.html',
	styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
	logopencil="https://drive.google.com/uc?export=download&id=1jA2K7nPYax0JVefFmgn8HvsYre_25zie";
	logoadd="https://drive.google.com/uc?export=download&id=11BKh21cSfuiTBDHbY26XH5Ux9TBVYdWm";
	logoedu="https://drive.google.com/uc?export=download&id=1_TzJ4uPlPA_qU9DaaARLKqlLoXVi5pWu";
	logosave="https://drive.google.com/uc?export=download&id=1QjXoDP0V0L7EHnjlfAx5bMFH2T-NbYU7";
	logocancel="https://drive.google.com/uc?export=download&id=1DnHtyYLt7LgH7Nl6HsIOfSh2CDjNiYAE";
	logodelete="https://drive.google.com/uc?export=download&id=1iW5i4HOltXKRwV0Q2qsJp6mrZvmFq0rw";
	mySkills: any;
	modoEdicion: boolean = false;
	modoNuevoRegistro: boolean = false;
	i!: number;
	editID!: number;
	form: FormGroup;
	nombreColeccion = 'skills';
	datosCollection!: AngularFirestoreCollection<any>;
	datosArray!: any[];
	datos!: Observable<Iskills[]>;
	numRegistros!: number;

	constructor(public portfolioData: PortfolioService, public firestore: AngularFirestore,
		private firebaseService: FirebaseService) {
		this.form = new FormGroup ({
			name: new FormControl (['', [Validators.required, Validators.minLength(2)]]),
			urlImage: new FormControl ([''], [Validators.required, Validators.minLength(2)]),
			level: new FormControl (['', [Validators.required, Validators.minLength(2)]])
		});
	}

	verificarYCrearMiColeccion(): void {
		const nombreColeccion = 'skills';
		this.firebaseService.verificarYCrearColeccion(nombreColeccion);
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
			console.log('DEBUG: getDatosArray', this.datosArray);
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
		console.log('SKILLS COMPONENTS');
		
		this.verificarYCrearMiColeccion();
		this.datosCollection = this.firestore.collection(this.nombreColeccion);
		this.datos = this.datosCollection.valueChanges();
		this.getDatosArray();
		this.getNumRegistros();
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


		console.log("valueFormDetalles: ", valueForms[0].value);
		console.log("valueFormUrlImage: ", valueForms[1].value);
		console.log("valueFormEstado: ", valueForms[2].value);

		this.modoNuevoRegistro = true;
	}

	onEdit(id: number, i: number, event: Event) {
		this.editID = id;
		this.i = i;
		console.log("i", i);
		console.log("editID", this.editID);
		console.log("this.form.value: ", this.form.value);
		console.log("id: ", id);

		this.form.setValue({
			name: this.mySkills[i].name,
			urlImage: this.mySkills[i].urlImage,
			level: this.mySkills[i].level
		})

		console.log("this.form.value: ", this.form.value);

		this.modoEdicion = true;

	}


	onSaveEdit(event: Event) {
		event.preventDefault;
		this.portfolioData.putSkill(this.form.value, this.editID).subscribe(data => {
			console.log("this.form.value: ", this.form.value);
			console.log("id: ", this.editID);
			console.log("SKILL method PUT Data Editada", data);

			this.portfolioData.obtenerOneDatosSkill(this.editID).subscribe(data => {
				console.log("Dato: " + JSON.stringify(data));
				this.mySkills[this.i] = data;
				console.log("mySkills[i : ", this.mySkills[this.i]);
			});

		});
		this.modoEdicion = false;
	}



	onSaveNewNuevoRegistro(event: Event) {
		event.preventDefault;
		this.portfolioData.postSkill(this.form.value).subscribe(data => {
			console.log("this.form.value: ", this.form.value);
			console.log("SKILL method POST Data Enviada", data);

			this.portfolioData.obtenerDatosSkills().subscribe(data => {
				this.mySkills = data;
			});
		});

		this.modoNuevoRegistro = false;
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


		console.log("valueFormDetalles: ", valueForms[0].value);
		console.log("valueFormEstado: ", valueForms[1].value);

		this.modoEdicion = false;
	}


	onDelete(i: any, event: Event) {
		this.i = i;
		this.modoEdicion = false;
		event.preventDefault;
		Swal.fire({
			title: `¿ELIMINAR SKILL ${(this.mySkills[i].tecnologia).toUpperCase()}?`,
			text: "No podrá revertir los cambios.",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#00b5ff',
			confirmButtonText: 'Si, Eliminar.',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.isConfirmed) {
				this.portfolioData.deleteSkill(this.mySkills[i].id).subscribe(data => {
					console.log("Borrando registro", data);

					this.portfolioData.obtenerDatosSkills().subscribe(data => {
						this.mySkills = data;
					});

				});

				Swal.fire({
					title: 'ITEM ELIMINADO',
					icon: 'success',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})
	}




}
