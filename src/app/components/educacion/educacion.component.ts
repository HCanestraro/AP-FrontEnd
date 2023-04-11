import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from './../../services/portfolio.service';
import { Cheimg } from 'src/app/clases/cheimg';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-educacion',
	templateUrl: './educacion.component.html',
	styleUrls: ['./educacion.component.css']
})

export class EducacionComponent implements OnInit {


	myEducacion: any;
	modeEdition: boolean = false;
	modeNewRecord: boolean = false;
	i!: number;
	editID!: number;
	form: FormGroup;

	constructor(public portfolioData: PortfolioService) {
		this.form = new FormGroup({
			detalles: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			estado: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			institucion: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			periodo: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			titulo: new FormControl(['', [Validators.required, Validators.minLength(2)]])
		})
	}

	ngOnInit(): void {
		this.portfolioData.getdata().subscribe(data => {
		this.myEducacion = data.educacion;
		console.log("DATA-educacion", this.myEducacion);
		/* this.portfolioData.obtenerDatosEducacion().subscribe(data => {
			this.myEducacion = JSON.stringify(data);
			console.log("JSON:", this.myEducacion);
		}); */
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
		console.log("valueFormDetalles: ", valueForms[0].value); console.log("valueFormEstado: ", valueForms[1].value); console.log("valueFormInstitucion: ", valueForms[2].value); console.log("valueFormPeriodo: ", valueForms[3].value); console.log("valueFormTitulo: ", valueForms[4].value);
		this.modeNewRecord = true;
	}

	onEdit(id: any, i: number, event: Event) {
		this.editID = id;
		this.i = i;
		console.log("i", i); console.log("editID", this.editID); console.log("this.form.value: ", this.form.value); console.log("id: ", id);
		this.form.setValue({
			detalles: this.myEducacion[i].detalles,
			estado: this.myEducacion[i].estado,
			institucion: this.myEducacion[i].institucion,
			periodo: this.myEducacion[i].periodo,
			titulo: this.myEducacion[i].titulo
		})
		console.log("this.form.value: ", this.form.value);
		this.modeEdition = true;
	}

	onSaveEdit(event: Event) {
		event.preventDefault;
		this.portfolioData.putEducacion(this.form.value, this.editID).subscribe(data => {
			console.log("this.form.value: ", this.form.value);
			console.log("id: ", this.editID);
			console.log("EDUCACIÓN method PUT Data Editada", data);
			this.portfolioData.obtenerOneDatosEducacion(this.editID).subscribe(data => {
				console.log("Dato: " + JSON.stringify(data));
				this.myEducacion[this.i] = data;
				console.log("myEducacion[i : ", this.myEducacion[this.i]);
			});
		});
		this.modeEdition = false;
	}

	onSaveNewNuevoRegistro(event: Event) {
		event.preventDefault;
		this.portfolioData.postEducacion(this.form.value).subscribe(data => {
			console.log("this.form.value: ", this.form.value);
			console.log("AcercaDe method post Data", data);

			this.portfolioData.obtenerDatosEducacion().subscribe(data => {
				this.myEducacion = data;
			});
		});
		this.modeNewRecord = false;
	}

	onDelete(i: number, event: Event) {
		this.i = i;
		this.modeEdition = false;
		event.preventDefault;
		Swal.fire({
			title: `¿ELIMINAR EDUCACIÓN ${(this.myEducacion[i].titulo).toUpperCase()}?`,
			text: "No podrá revertir los cambios.",
			icon: 'warning',
			confirmButtonColor: '#d33',
			confirmButtonText: 'Si, Eliminar.',
			showCancelButton: true,
			cancelButtonText: 'Cancelar',
			cancelButtonColor: '#00b5ff'
		}).then((result) => {
			if (result.isConfirmed) {
				this.portfolioData.deleteEducacion(this.myEducacion[i].id).subscribe(data => {
					console.log("Borrando registro", data);

					this.portfolioData.obtenerDatosEducacion().subscribe(data => {
						this.myEducacion = data;
					});

				});
				Swal.fire({
					title: 'ITEM ELIMINADO',
					icon: 'success',
					showConfirmButton: false,
					timer: 1000
				})
			}
			console.log("borrando registro");
		})
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
		valueForms[3].setValue('');
		valueForms[4].setValue('');
		console.log("valueFormDetalles: ", valueForms[0].value);
		console.log("valueFormEstado: ", valueForms[1].value);
		console.log("valueFormInstitucion: ", valueForms[2].value);
		console.log("valueFormPeriodo: ", valueForms[3].value);
		console.log("valueFormTitulo: ", valueForms[4].value);
		this.modeEdition = false;
	}
}
