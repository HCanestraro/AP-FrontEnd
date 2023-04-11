import { Component, OnInit } from '@angular/core';
import { PortfolioService } from './../../services/portfolio.service';
import { Iexperiencia } from 'src/app/interfaces/iexperiencia';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

	myExperiencia: any;
	modoNuevoRegistro: boolean=false;
	modeNewRecord: boolean=false;

	modeEdition: boolean = false;
	editID!: number;
	i!: number;
	form: FormGroup;

	constructor( private portfolioData: PortfolioService) {
		this.form = new FormGroup({
			educacion: new FormControl([''], [Validators.required, Validators.minLength(2)]),
			puesto: new FormControl([''], [Validators.required, Validators.minLength(2)]),
			periodo: new FormControl([''], [Validators.required, Validators.minLength(2)]),
			empresa: new FormControl([''], [Validators.required, Validators.minLength(2)]),
			actividades: new FormControl([''], [Validators.required, Validators.minLength(2)])
		})
	}
	ngOnInit(): void {
		this.portfolioData.getdata().subscribe(data => {
			this.myExperiencia = data.experiencia;
			console.log("DATA-Experiencia", this.myExperiencia);
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
			valueForms[3].setValue('');
			valueForms[4].setValue('');
	
			console.log("valueFormEducacion: ", valueForms[0].value);
			console.log("valueFormPuesto: ", valueForms[1].value);
			console.log("valueFormPeriodo: ", valueForms[2].value);
			console.log("valueFormEmpresa: ", valueForms[3].value);
			console.log("valueFormActividades: ", valueForms[4].value);
	
			this.modeNewRecord = true;
		}

		onEdit(id: any, i: number, event: Event) {
			this.editID = id;
			this.i = i;

			this.form.setValue({
				educacion: this.myExperiencia[i].educacion,
				puesto: this.myExperiencia[i].puesto,
				periodo: this.myExperiencia[i].periodo,
				empresa: this.myExperiencia[i].empresa,
				actividades: this.myExperiencia[i].actividades
			})
			this.modeEdition = true;
		}
		onSaveEdit(event: Event) {
			event.preventDefault;
			  this.portfolioData.putExperiencia(this.form.value, this.editID).subscribe(data => {
				console.log("this.form.value: " , this.form.value);
				console.log("id: " , this.editID);
				console.log("EXPERIENCIA method PUT Data Editada", data);
		  
				this.portfolioData.obtenerOneDatosExperiencia(this.editID).subscribe(data => {
				  console.log("Dato: " + JSON.stringify(data));
				  this.myExperiencia[this.i]=data;
				  console.log("miPortafolio[i : ", this.myExperiencia[this.i]);
				});
		  
			  });
			this.modeEdition = false;
	
		}

	}		
