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
