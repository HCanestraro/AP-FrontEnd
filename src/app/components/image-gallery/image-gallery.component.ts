import { Component, OnInit, Output } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { AngularFireStorage } from '@angular/fire/compat/storage';
// import * as firebase from 'firebase/compat';
// import { Observable, forkJoin, map, switchMap } from 'rxjs';
// import { Image } from 'src/app/interfaces/image.interface';
// import { finalize } from 'rxjs/operators';
// import * as firebase from 'firebase/compat';
// import { getStorage, ref } from "firebase/storage";
// import { EventEmitter } from "@angular/core";
// const storage = getStorage();
// const storageRef = ref(storage);
// import { listAll } from "firebase/storage";

// import { Cimg } from './../../interfaces/cimg';

@Component({
	selector: 'app-image-gallery',
	templateUrl: './image-gallery.component.html',
	styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit {
	// form!: FormGroup;
	// imagen!: Observable<Image>;
	// selectedImage: any;
	// itemRefs: any = [];
	// 	@Output()  fileSelected = new EventEmitter<File>();private formBuilder: FormBuilder, private storage: AngularFireStorage
	constructor() {
	 }

	ngOnInit() {
		console.log('debug image-galleri oninit ln17');
		// console.log(this.cimg.getlogopencil());
	/* listAll(storageRef).then((res) => {
  		res.items.forEach((itemRef) => {
  		  // ...
		  this.itemRefs = itemRef;
		  });
}); */

// 		this.form = this.formBuilder.group({
// 			name: ['', Validators.required],
// 			image: ['', Validators.required]
// 		  });
		/* const storageRef = firebase.storage().ref();
		const fileRef = storageRef.child(`https://firebasestorage.googleapis.com/v0/b/ap-frontend-ac93a.appspot.com/o/`);

		fileRef.getDownloadURL().then(url => {
  			fetch(url).then(response => {
    		response.text().then(text => {
      		console.log(text);
    		});
  		});
		}); */

		
	}
// selectFile(itemRef: any) {
// 		  itemRef.getDownloadURL().then((url: RequestInfo | URL) => {
// 			fetch(url).then((res) => res.blob()).then((blob) => {
// 			  const file = new File([blob], itemRef.name);
// 			  this.fileSelected.emit(file);
// 			});
// 		  });
// 		} */
}
// 	selectImage(event: any) {
// 		const file = event.target.files[0];
// 		const filePath = `images/${Date.now()}_${file.name}`;
// 		const fileRef = this.storage.ref(filePath);
// 		const task = this.storage.upload(filePath, file);
		
// 		task.snapshotChanges().pipe(
// 		  finalize(() => {
// 			fileRef.getDownloadURL().subscribe(url => {
// 			  this.imagen = {
// 				name?: file.name,
// 				url: url
// 			  };
// 			});
			
// 			this.form.get('image').setValue(filePath);
// 		  })
// 		).subscribe();
// 	  }
	  
	  
// 	// selectImage(image: any) {
// 	// 	this.selectedImage=image;
// 	// }
// 	// obtenerURLArchivo(nombreArchivo: string): Observable<string> {
// 	// 	const referencia = this.storage.ref(nombreArchivo);
// 	// 	return referencia.getDownloadURL();
// 	//   }
// 	// cheDownloadStorage(fileName: string) {
// 	// 	const ref = this.storage.ref(fileName);
// 	// 	ref.getDownloadURL().subscribe( url => {
// 	// 		console.log('file:',fileName,' ',url);
// 	// 		const fURL= url;
// 	// 		return fURL;
// 	// 	});
// 	// }
// 	// this.firebaseService.cargarDatosEnFirebase('educacion',this.educacionList);
// 	// this.getDatosArray();
// 	// this.experienciaList=this.firebase.getDatosArray('experiencia');
// 	// this.educacionService.getElementos().subscribe(elementos => {
// 	// 	this.elementos = elementos;
// 	// });
// 	// this.logopencil = this.obtenerURLArchivo('logoPencil.png');/* .__zone_symbol__value */
// 	// console.log('pen',this.logopencil);
// 	// this.logoadd = this.cheDownloadStorage('logoAdd.png');
// 	// this.logoedu = this.cheDownloadStorage('logoEdu.png');
// 	// this.logosave = this.cheDownloadStorage('logoSave.png');
// 	// this.logocancel = this.cheDownloadStorage('logoCancel.png');
// 	// this.logodelete = this.cheDownloadStorage('logoDelete.png');
// }
