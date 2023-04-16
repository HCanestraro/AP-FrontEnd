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
	logopencil!: String;
	logoadd!: String;
	logoedu!: String;
	logosave!: String;
	logocancel!: String;
	logodelete!: String;
	logoskills!: String;
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
		this.logopencil="https://drive.google.com/uc?export=download&id=1jA2K7nPYax0JVefFmgn8HvsYre_25zie";
		this.logoadd= "https://drive.google.com/uc?export=download&id=11BKh21cSfuiTBDHbY26XH5Ux9TBVYdWm";
		this.logoedu= "https://drive.google.com/uc?export=download&id=1_TzJ4uPlPA_qU9DaaARLKqlLoXVi5pWu";
		this.logosave= "https://drive.google.com/uc?export=download&id=1QjXoDP0V0L7EHnjlfAx5bMFH2T-NbYU7";
		this.logocancel= "https://drive.google.com/uc?export=download&id=1DnHtyYLt7LgH7Nl6HsIOfSh2CDjNiYAE";
		this.logodelete= "https://drive.google.com/uc?export=download&id=1iW5i4HOltXKRwV0Q2qsJp6mrZvmFq0rw";
		this.logoskills= "https://drive.google.com/uc?export=download&id=1XApdWSnN7YZC0Y5B0IybEyefUZ10wTuu";

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
