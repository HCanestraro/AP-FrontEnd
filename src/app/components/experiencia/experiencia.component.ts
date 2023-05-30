import { Component, OnInit } from '@angular/core';
import { PortfolioService } from './../../services/portfolio.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
	logopencil="https://drive.google.com/uc?export=download&id=1jA2K7nPYax0JVefFmgn8HvsYre_25zie";
	logoadd="https://drive.google.com/uc?export=download&id=11BKh21cSfuiTBDHbY26XH5Ux9TBVYdWm";
	logoedu="https://drive.google.com/uc?export=download&id=1_TzJ4uPlPA_qU9DaaARLKqlLoXVi5pWu   ";
	logosave="https://drive.google.com/uc?export=download&id=1QjXoDP0V0L7EHnjlfAx5bMFH2T-NbYU7";
	logocancel="https://drive.google.com/uc?export=download&id=1DnHtyYLt7LgH7Nl6HsIOfSh2CDjNiYAE";
	logodelete="https://drive.google.com/uc?export=download&id=1iW5i4HOltXKRwV0Q2qsJp6mrZvmFq0rw";
	myExperiencia: any;
	modoNuevoRegistro: boolean=false;

	constructor( public portfolioData: PortfolioService, public firestore: AngularFirestore,
		private firebaseService: FirebaseService) {}
	ngOnInit(): void {
		this.portfolioData.getdata().subscribe(data => {
			this.myExperiencia = data.experiencia;
			
			console.log("DATA-Experiencia", this.myExperiencia);
		})}
		onCrear() {}
	}		
