import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Ipersona } from 'src/app/interfaces/ipersona';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map, take } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Iaboutme } from 'src/app/interfaces/iaboutme';

@Component({
	selector: 'app-banner',
	templateUrl: './banner.component.html',
	styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
	logopencil = "https://drive.google.com/uc?export=download&id=1jA2K7nPYax0JVefFmgn8HvsYre_25zie";
	logoadd = "https://drive.google.com/uc?export=download&id=11BKh21cSfuiTBDHbY26XH5Ux9TBVYdWm";
	logoedu = "https://drive.google.com/uc?export=download&id=1_TzJ4uPlPA_qU9DaaARLKqlLoXVi5pWu   ";
	logosave = "https://drive.google.com/uc?export=download&id=1QjXoDP0V0L7EHnjlfAx5bMFH2T-NbYU7";
	logocancel = "https://drive.google.com/uc?export=download&id=1DnHtyYLt7LgH7Nl6HsIOfSh2CDjNiYAE";
	logodelete = "https://drive.google.com/uc?export=download&id=1iW5i4HOltXKRwV0Q2qsJp6mrZvmFq0rw";

	// myPortfolio: any;
	public myPersona: any;
	public myAboutMe: any;
	nombreColeccion = 'persona';
	datosCollection: AngularFirestoreCollection<any>;
	datosArray!: any[];
	datos: Observable<Ipersona[]>;
	numRegistros!: number;
	nombreColeccion2 = 'aboutme';
	datosCollection2: AngularFirestoreCollection<any>;
	datosArray2!: any[];
	datos2: Observable<Iaboutme[]>;
	numRegistros2!: number;	
	
	constructor(private portfolioData: PortfolioService, public firestore: AngularFirestore,
		private firebaseService: FirebaseService) { 
		this.datosCollection = this.firestore.collection(this.nombreColeccion);
		this.datos = this.datosCollection.valueChanges();
		this.getDatosArray();
		this.getNumRegistros();
		this.verificarYCrearMiColeccion2();
		this.datosCollection2 = this.firestore.collection(this.nombreColeccion2);
		this.datos2 = this.datosCollection2.valueChanges();
		this.getDatosArray2();
		this.getNumRegistros2();
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
				this.myPersona=array;
				// console.log('DEBUG: getDatosArray',this.datosArray);
			})
		}

		getDatosArray2(): void {
			this.datosCollection2.snapshotChanges().pipe(
				map((snapshots) => {
					return snapshots.map((snapshot) => {
						const data = snapshot.payload.doc.data();
						const id = snapshot.payload.doc.id;
						return { id, ...data };
					});
				})
			).subscribe((array) => {
				this.datosArray2 = array;
				this.myAboutMe=array;
				// console.log('DEBUG: getDatosArray2',this.datosArray2);
			})
		}
		getNumRegistros(): void {
			this.datosCollection?.get().subscribe((snapshot) => {
				this.numRegistros = snapshot.size;
				// console.log("REG:", this.numRegistros);
			});
		}
		getNumRegistros2(): void {
			this.datosCollection2?.get().subscribe((snapshot) => {
				this.numRegistros2 = snapshot.size;
				// console.log("REG:", this.numRegistros2);
			});
		}
		verificarYCrearMiColeccion():void {
			this.firebaseService.verificarYCrearColeccion(this.nombreColeccion);
		}
		verificarYCrearMiColeccion2():void {
			this.firebaseService.verificarYCrearColeccion(this.nombreColeccion2);
		}

	ngOnInit(): void {
		// this.portfolioData.getdata().subscribe(data => {
		// 	this.myPortfolio = data;
		// 	this.myPersona = data.persona;
		// 	console.log("MYPERSONA", this.myPersona);
		// 	console.log(this.myPersona[0].nombres);
		// 	// this.cheP.push(this.myPersona[0]);
		// 	this.myAboutMe = data.aboutme;
		// 	console.log(this.myAboutMe);

		// });
		console.log(this.nombreColeccion);
		console.log(this.nombreColeccion2);
		console.log(this.numRegistros2);

	}

}
