import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, FormBuilder, NonNullableFormBuilder } from '@angular/forms';
import { PortfolioService } from './../../services/portfolio.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, map, take } from 'rxjs';
import { Isoftskills } from 'src/app/interfaces/isoftskills';
// import { CheMediaService } from 'src/app/services/che-media.service';


@Component({
	selector: 'app-softskills',
	templateUrl: './softskills.component.html',
	styleUrls: ['./softskills.component.css']
})


export class SoftskillsComponent implements OnInit {
	logopencil = "https://drive.google.com/uc?export=download&id=1jA2K7nPYax0JVefFmgn8HvsYre_25zie";
	logoadd = "https://drive.google.com/uc?export=download&id=11BKh21cSfuiTBDHbY26XH5Ux9TBVYdWm";
	logoedu = "https://drive.google.com/uc?export=download&id=1_TzJ4uPlPA_qU9DaaARLKqlLoXVi5pWu   ";
	logosave = "https://drive.google.com/uc?export=download&id=1QjXoDP0V0L7EHnjlfAx5bMFH2T-NbYU7";
	logocancel = "https://drive.google.com/uc?export=download&id=1DnHtyYLt7LgH7Nl6HsIOfSh2CDjNiYAE";
	logodelete = "https://drive.google.com/uc?export=download&id=1iW5i4HOltXKRwV0Q2qsJp6mrZvmFq0rw";
	nombreColeccion = 'softskills';
	datosCollection!: AngularFirestoreCollection<any>;
	datosArray!: any[];
	datos!: Observable<Isoftskills[]>;
	numRegistros!: number;

	editMode = false;
	dialogForm!: FormGroup;
	softskillsCollection: AngularFirestoreCollection<Isoftskills>;
	@ViewChild('dialogTemplate', { static: true }) dialogTemplate!: TemplateRef<any>;
	softskillsItems: Observable<Isoftskills[]>;

	dialogData: Isoftskills = {
		id: '',
		name: '',
		urlImage: '',
		level: ''
	};

	mySoftskills: any;
	modoEdicion: boolean = false;
	modoNuevoRegistro: boolean = false;
	i!: number;
	editID!: number;
	id!: string;
	cheMediaT: any;
	//   , private cheMedia: CheMediaService
	registroDoc: AngularFirestoreDocument<any>;
	registro: Observable<any>;
	//   campos = [
	// { nombre: 'Campo 1', clave: 'campo1' },
	// { nombre: 'Campo 2', clave: 'campo2' },
	camposSoftskills = [{ id: '1' }, { name: 'name' }, { urlImage: 'url' }, { level: '11' }];

	// Agrega más campos según sea necesario
	//   ];

	constructor(private firebaseService: FirebaseService,
		private firestore: AngularFirestore,
		private dialog: MatDialog) {
		this.softskillsCollection = this.firestore.collection<Isoftskills>('softskills');
		this.softskillsItems = this.softskillsCollection.valueChanges();
		this.dialogForm = new FormGroup({
			id: new FormControl('', Validators.required),
			name: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			urlImage: new FormControl([''], [Validators.required, Validators.minLength(2)]),
			level: new FormControl(['', [Validators.required, Validators.minLength(2)]])
		});
		this.registroDoc = this.firestore.collection(this.nombreColeccion).doc(this.id);
		this.registro = this.registroDoc.valueChanges();

		this.datosCollection = this.firestore.collection(this.nombreColeccion);
		this.datos = this.datosCollection.valueChanges();
		this.getDatosArray();
		this.getNumRegistros();
		this.verificarYCrearMiColeccion();
		console.log('DEBUG: SOFTSKILLS');

	}
	ngOnInit(): void {
		console.log('DEBUG: SKILLS COMPONENTS');
		this.verificarYCrearMiColeccion();
		this.datosCollection = this.firestore.collection(this.nombreColeccion);
		this.datos = this.datosCollection.valueChanges();
	}

	readDocument(documentId: string) {
		this.firestore.collection('softskills').doc(documentId).snapshotChanges().subscribe(snapshot => {
			const data = snapshot.payload.data();
			const id = snapshot.payload.id;

			// Utiliza el ID y los datos del documento como desees
			console.log('ID:', id);
			console.log('Datos:', data);
		});
	}

	openAddDialog(): void {
		this.editMode = false;
		this.dialogData = {
			id: '',
			name: '',
			urlImage: '',
			level: ''
		};
		this.openDialog();
	}
	openEditDialog(item: Isoftskills): void {
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
			this.softskillsCollection.doc().update(this.dialogData);
		} else {
			// Añadir nuevo elemento
			this.softskillsCollection.add(this.dialogData);
		}
		// Cerrar el diálogo después de guardar
		this.dialog.closeAll();
	}
	deleteItem(item: any): void {
		// Eliminar el elemento de la colección en Firebase
		this.firebaseService.deleteRecord('skills', item);/* .delete(); */
	}

	modificarRegistro() {
		this.registroDoc.update(this.registro).then(() => {
			console.log('Registro modificado correctamente');
		}).catch(error => {
			console.error('Error al modificar el registro', error);
		});
	}

	/* **************************************************************************************************** */

	verificarYCrearMiColeccion(): void {
		const nombreColeccion = 'softskills';
		this.firebaseService.verificarYCrearColeccion(nombreColeccion,
			{
				id: '1',
				name: 'Name',
				urlImage: '',
				level: '89'
			});
	}

	/* **************************************************************************************************** */
	getNumRegistros(): void {
		this.datosCollection?.get().subscribe((snapshot) => {
			this.numRegistros = snapshot.size;
			console.log("REG:", this.numRegistros);
		});
	}
	/* **************************************************************************************************** */
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
	/* **************************************************************************************************** */
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


}

