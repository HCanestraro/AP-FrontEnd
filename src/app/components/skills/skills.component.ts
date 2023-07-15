import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl,  FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map, take } from 'rxjs';
import { Iskills } from 'src/app/interfaces/iskills';
import { user } from '@angular/fire/auth';

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
	logoSkill = "https://drive.google.com/uc?export=download&id=1XApdWSnN7YZC0Y5B0IybEyefUZ10wTuu";
	nombreColeccion = 'skills';
	datosCollection!: AngularFirestoreCollection<any>;
	datosArray!: any[];
	datos: Observable<Iskills[]>;
	numRegistros!: number;
	// GPT
	editMode = false;
	dialogForm: FormGroup;
	skillsCollection: AngularFirestoreCollection<Iskills>;
	@ViewChild('dialogTemplate', { static: true }) dialogTemplate!: TemplateRef<any>;
	skillsItems: Observable<Iskills[]>;

	dialogData: Iskills = {
		id: '',
		descripcion: '',
		urlImagen: ''
	};

	isEditing: boolean = false;
	// miColeccionService = new FirestoreService(COLLECTION_NAME,'skills');
	items!: any[];
	mySkills: any;
	modoEdicion: boolean = false;
	modoNuevoRegistro: boolean = false;
	i!: number;
	editID!: number;

	constructor(private firebaseService: FirebaseService, 
		private firestore: AngularFirestore, 
		private dialog: MatDialog) {
			this.skillsCollection = this.firestore.collection<Iskills>('skills');
			this.skillsItems = this.skillsCollection.valueChanges();
			this.dialogForm = new FormGroup({
				id: new FormControl('', Validators.required),
				descripcion: new FormControl('', Validators.required),
				urlImagen: new FormControl('', Validators.required)
			});
			this.datosCollection = this.firestore.collection(this.nombreColeccion);
		this.datos = this.datosCollection.valueChanges();
		this.getDatosArray();
		this.getNumRegistros();
		this.verificarYCrearMiColeccion();
		console.log('DEBUG: Skills');

		 }

	ngOnInit():void {
		console.log('DEBUG: SKILLS COMPONENTS');
		this.verificarYCrearMiColeccion();
		this.datosCollection = this.firestore.collection(this.nombreColeccion);
		this.datos = this.datosCollection.valueChanges();
	}

	readDocument(documentId: string) {
		this.firestore.collection('skills').doc(documentId).snapshotChanges().subscribe(snapshot => {
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
			id:'',
			descripcion: '',
			urlImagen: ''
		};
		this.openDialog();
	}
	openEditDialog(item: Iskills): void {
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
			this.skillsCollection.doc().update(this.dialogData);
		} else {
			// Añadir nuevo elemento
			this.skillsCollection.add(this.dialogData);
		}
		// Cerrar el diálogo después de guardar
		this.dialog.closeAll();
	}
	deleteItem(item: any): void {
		// Eliminar el elemento de la colección en Firebase
		this.firebaseService.deleteRecord('skills', item);/* .delete(); */
	}
	/* cancelEdit() {
		this.isEditing = false;
		this.itemForm.reset();
	} */

	// startEdit() {
		// this.isEditing = true;
		// Asignar los valores actuales del elemento al formulario
		// Asignar los valores actuales del elemento al formulario
		// this.formControls['descripcion'].setValue('Valor actual de la descripción');
		// this.formControls['urlImagen'].setValue('Valor actual de la URL de la imagen');
	// }

	
	verificarYCrearMiColeccion(): void {
		const id1 = this.firestore.createId();
		/* const userId = this.firestore.collection(this.nombreColeccion).doc().get({
			id: user?.uid;
		}; */
		this.firebaseService.verificarYCrearColeccion(this.nombreColeccion,
		{
			id: id1,
			descripcion: '',
			urlImagen: ''
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
			console.log('DEBUG Skills: getDatosArray', this.datosArray);
		})
	}
// firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>.id: string
	getNumRegistros(): void {
		this.datosCollection?.get().subscribe((snapshot) => {
			this.numRegistros = snapshot.size;
			console.log("REG:", this.numRegistros);
		});
	}

	
	
	// borrarRegistro(documentId: string) {
	// 	console.log('DEBUG: borrarRegistro:', documentId);
	// 	this.firestore.collection(this.nombreColeccion).doc(documentId).delete()
	// 		.then(() => {
	// 			console.log('Registro eliminado correctamente');
	// 		})
	// 		.catch((error) => {
	// 			console.error('Error al eliminar el registro:', error);
	// 		});
	// }

	// onCrear() {
	
	// 	this.modoNuevoRegistro = true;
	// }

	// onEdit(id: number, i: number, event: Event) {
	// 	this.editID = id;
	// 	this.i = i;
	// 	console.log("i", i);
	// 	console.log("editID", this.editID);
	// 	console.log("this.form.value: ", this.form.value);
	// 	console.log("id: ", id);

	// 	this.form.setValue({
	// 		descripcion: this.mySkills[i].descripcion,
	// 		urlImagen: this.mySkills[i].urlImagen
	// 	})
	// 	console.log("this.form.value: ", this.form.value);
	// 	this.modoEdicion = true;
	// }


}
