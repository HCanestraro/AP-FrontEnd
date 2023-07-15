import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PortfolioService } from './../../services/portfolio.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map, take } from 'rxjs';
import { Iexperiencia } from 'src/app/interfaces/iexperiencia';
@Component({
	selector: 'app-experiencia',
	templateUrl: './experiencia.component.html',
	styleUrls: ['./experiencia.component.css']
})

export class ExperienciaComponent implements OnInit {
	logopencil = "https://drive.google.com/uc?export=download&id=1jA2K7nPYax0JVefFmgn8HvsYre_25zie";
	logoadd = "https://drive.google.com/uc?export=download&id=11BKh21cSfuiTBDHbY26XH5Ux9TBVYdWm";
	logoedu = "https://drive.google.com/uc?export=download&id=1_TzJ4uPlPA_qU9DaaARLKqlLoXVi5pWu   ";
	logosave = "https://drive.google.com/uc?export=download&id=1QjXoDP0V0L7EHnjlfAx5bMFH2T-NbYU7";
	logocancel = "https://drive.google.com/uc?export=download&id=1DnHtyYLt7LgH7Nl6HsIOfSh2CDjNiYAE";
	logodelete = "https://drive.google.com/uc?export=download&id=1iW5i4HOltXKRwV0Q2qsJp6mrZvmFq0rw";
	modoEdicion: boolean = false;
	modoNuevoRegistro: boolean = false;
	i!: number;
	editID!: number;
	dialogForm: FormGroup;
	nombreColeccion = 'experiencia';
	datosCollection!: AngularFirestoreCollection<any>;
	datosArray!: any[];
	datos!: Observable<Iexperiencia[]>;
	numRegistros!: number;

	editMode = false;
	experienciaCollection: AngularFirestoreCollection<Iexperiencia>;

	@ViewChild('dialogTemplate', { static: true }) dialogTemplate!: TemplateRef<any>;

	experienciaItems: Observable<Iexperiencia[]>;
	/*  = [
		this.firestore.collection('educacion').valueChanges().subscribe(data => { this.Ieducacion = data; })
	]; */

	dialogData: Iexperiencia = {
		id: '',
		ubicacion: '',
		puesto: '',
		periodo: '',
		empresa: '',
		actividades: ''
	};

	constructor(private firebaseService: FirebaseService,
		public firestore: AngularFirestore,
		private dialog: MatDialog) {
		this.experienciaCollection = this.firestore.collection<Iexperiencia>('experiencia');
		this.experienciaItems = this.experienciaCollection.valueChanges();
		this.dialogForm = new FormGroup({
			id: new FormControl('', Validators.required),
			ubicacion: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			puesto: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			periodo: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			empresa: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			actividades: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
		})
	}
	openAddDialog(): void {
		this.editMode = false;
		this.dialogData = {
			id: '',
			ubicacion: '',
			puesto: '',
			periodo: '',
			empresa: '',
			actividades: ''
		};
		this.openDialog();
	}
	openEditDialog(item: Iexperiencia): void {
		this.editMode = true;
		this.dialogData = { ...item };
		this.openDialog();
	}
	openDialog(): void {
		const dialogRef = this.dialog.open(this.dialogTemplate);
		dialogRef.afterClosed().subscribe(() => {

		});
	}
	saveItem(): void {
		if (this.editMode) {
			// Guardar cambios
			this.experienciaCollection.doc().update(this.dialogData);
		} else {
			// Añadir nuevo elemento
			this.experienciaCollection.add(this.dialogData);
		}
		// Cerrar el diálogo después de guardar
		this.dialog.closeAll();
	}
	deleteItem(item: any): void {
		// Eliminar el elemento de la colección en Firebase
		this.firebaseService.deleteRecord('experiencia', item);/* .delete(); */
	}
	verificarYCrearMiColeccion(): void {
		const id1 = this.firestore.createId();
		const nombreColeccion = 'experiencia';
		this.firebaseService.verificarYCrearColeccion(nombreColeccion,
			{
				id: id1,
				ubicacion: '',
				puesto: '',
				periodo: '',
				empresa: '',
				actividades: ''
			});
	}

	getNumRegistros(): void {
		this.datosCollection?.get().subscribe((snapshot) => {
			this.numRegistros = snapshot.size;
			console.log("REG:", this.numRegistros);
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
			console.log('DEBUG: getDatosArray', this.datosArray);
		})
	}
	ngOnInit(): void {
		this.verificarYCrearMiColeccion();
		this.datosCollection = this.firestore.collection(this.nombreColeccion);
		this.datos = this.datosCollection.valueChanges();
		this.getDatosArray();
		this.getNumRegistros();
	}
}