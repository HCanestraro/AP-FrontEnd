import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from './../../services/portfolio.service';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import { NgFor } from '@angular/common';

@Component({
	selector: 'app-proyectos',
	templateUrl: './proyectos.component.html',
	styleUrls: ['./proyectos.component.css']
})

export class ProyectosComponent implements OnInit {
	myProyectos: any;
	form: FormGroup;
	modeNewRecord: boolean = false;
	modeEdition: boolean = false;
	i!: number;
	editID!: number;
	logopencil!: String;
	logoadd!: String;
	logoedu!: String;
	logosave!: String;
	logocancel!: String;
	logodelete!: String;
	logoskills!: String;

	constructor(private portfolioData: PortfolioService) {
		/* this.logopencil = "https://drive.google.com/uc?export=download&id=1jA2K7nPYax0JVefFmgn8HvsYre_25zie";
		this.logoadd = "https://drive.google.com/uc?export=download&id=11BKh21cSfuiTBDHbY26XH5Ux9TBVYdWm";
		this.logoedu = "https://drive.google.com/uc?export=download&id=1_TzJ4uPlPA_qU9DaaARLKqlLoXVi5pWu";
		this.logosave = "https://drive.google.com/uc?export=download&id=1QjXoDP0V0L7EHnjlfAx5bMFH2T-NbYU7";
		this.logocancel = "https://drive.google.com/uc?export=download&id=1DnHtyYLt7LgH7Nl6HsIOfSh2CDjNiYAE";
		this.logodelete = "https://drive.google.com/uc?export=download&id=1iW5i4HOltXKRwV0Q2qsJp6mrZvmFq0rw";
		this.logoskills = "https://drive.google.com/uc?export=download&id=1XApdWSnN7YZC0Y5B0IybEyefUZ10wTuu"; */

		this.form = new FormGroup({
			descripcion: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			imagen: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			titulo: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			linklivedemo: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			linksourcedemo: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
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
			this.myProyectos = data.proyectos;
			console.log("DATA-proyectos", this.myProyectos);
			// console.log("LEN",this.myProyectos.length);
			// console.log(this.myProyectos[0]);
			
			});
	}

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

		console.log("valueFormTitulo: ", valueForms[0].value);
		console.log("valueFormImagen: ", valueForms[1].value);
		console.log("valueFormDescripcion: ", valueForms[2].value);
		console.log("valueFormLinkLiveDemo: ", valueForms[3].value);
		console.log("valueFormLinkSourceDemo: ", valueForms[4].value);

		this.modeNewRecord = true;

	}
	onEdit(id: any, i: number, event: Event) {
		this.editID = id;
		this.i = i;
		console.log("i", i);
		console.log("editID", this.editID);
		console.log("this.form.value: ", this.form.value);
		console.log("id: ", id);

		this.form.setValue({
			titulo: this.myProyectos[i].titulo,
			imagen: this.myProyectos[i].imagen,
			descripcion: this.myProyectos[i].descripcion,
			linklivedemo: this.myProyectos[i].linklivedemo,
			linksourcedemo: this.myProyectos[i].linksourcedemo
		})
		console.log("this.form.value: ", this.form.value);
		this.modeEdition = true;
	}

	onSaveEdit(event: Event) {
		event.preventDefault;
		this.portfolioData.putProyecto(this.form.value, this.editID).subscribe(data => {
			console.log("this.form.value: ", this.form.value);
			console.log("id: ", this.editID);
			console.log("PROYECTO method PUT Data Editada", data);


			this.portfolioData.obtenerOneDatosProyecto(this.editID).subscribe(data => {
				console.log("Dato: " + JSON.stringify(data));
				this.myProyectos[this.i] = data;
				console.log("myProyectos[i : ", this.myProyectos[this.i]);
			});

		});
		this.modeEdition = false;
	}

	onSaveNewNuevoRegistro(event: Event) {
		event.preventDefault;
		this.portfolioData.postProyecto(this.form.value).subscribe(data => {
			console.log("this.form.value: ", this.form.value);
			console.log("PROYECTO method POST Data Enviada", data);

			this.portfolioData.obtenerDatosProyecto().subscribe(data => {
				this.myProyectos = data;
			});
		});

		this.modeNewRecord = false;

	}


	onCancelNuevoRegistro() {
		this.modeNewRecord = false;
	}


	onCancel(event: Event) {
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

		this.modeEdition = false;
	}


	onDelete(i: any, event: Event) {
		this.i = i;
		this.modeEdition = false;
		event.preventDefault;
		Swal.fire({
			title: `¿ELIMINAR PROYECTO ${(this.myProyectos[i].titulo).toUpperCase()}?`,
			text: "No podrá revertir los cambios.",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#00b5ff',
			confirmButtonText: 'Si, Eliminar.',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.isConfirmed) {
				// this.portfolioData.deleteProyecto(this.myProyectos[i].id).subscribe(data => {
					// this.portfolioData.deleteProyecto(this.myProyectos[i].id).subscribe(data => {
						// console.log("Borrando registro", data);

					this.portfolioData.obtenerDatosProyecto().subscribe(data => {
						console.log("Borrando registo");
						
						this.myProyectos = data;
					});

	}});

				Swal.fire({
					title: 'ITEM ELIMINADO',
					icon: 'success',
					showConfirmButton: false,
					timer: 1000
				})
			}
		}


