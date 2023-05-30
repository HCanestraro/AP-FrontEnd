import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from './../../services/portfolio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})

export class ProyectosComponent  implements OnInit  {
	logopencil="https://drive.google.com/uc?export=download&id=1jA2K7nPYax0JVefFmgn8HvsYre_25zie";
	logoadd="https://drive.google.com/uc?export=download&id=11BKh21cSfuiTBDHbY26XH5Ux9TBVYdWm";
	logoedu="https://drive.google.com/uc?export=download&id=1_TzJ4uPlPA_qU9DaaARLKqlLoXVi5pWu   ";
	logosave="https://drive.google.com/uc?export=download&id=1QjXoDP0V0L7EHnjlfAx5bMFH2T-NbYU7";
	logocancel="https://drive.google.com/uc?export=download&id=1DnHtyYLt7LgH7Nl6HsIOfSh2CDjNiYAE";
	logodelete="https://drive.google.com/uc?export=download&id=1iW5i4HOltXKRwV0Q2qsJp6mrZvmFq0rw";
	 	myProyectos: any;
	  form: FormGroup;
	  modeNewRecord:boolean=false;
	  i!: number;
	  editID!: number;


	constructor( private portfolioData: PortfolioService) {
		this.form = new FormGroup({
			descripcion: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			imagen: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			titulo: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
		})
	}
	
	ngOnInit(): void {
		this.portfolioData.getdata().subscribe(data => {
			this.myProyectos = data.proyectos;
			
			console.log("DATA-proyectos", this.myProyectos);
		})}
	
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
			console.log("valueFormEstado: ", valueForms[1].value);
			console.log("valueFormInstitucion: ", valueForms[2].value);
	
			this.modeNewRecord = true;
	
		}
}
