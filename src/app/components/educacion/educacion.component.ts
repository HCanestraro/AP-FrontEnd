import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from './../../services/portfolio.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-educacion',
	templateUrl: './educacion.component.html',
	styleUrls: ['./educacion.component.css']
})

export class EducacionComponent implements OnInit {


	miPortafolio: any;
	myPortfolio: any;
	educacionList: any;
	modoEdicion: boolean = false;
	modoNuevoRegistro: boolean = false;
	i!: number;
	editID!: number;
	form: FormGroup;
<<<<<<< HEAD
	logopencil!: String;
	logoadd!: String;
	logoedu!: String;
	logosave!: String;
	logocancel!: String;
	logodelete!: String;
	logoskills!: String;
	constructor(public portfolioData: PortfolioService,private http: HttpClient) {
	this.form = new FormGroup({
=======


	constructor(public portfolioData: PortfolioService) {
		this.form = new FormGroup({
>>>>>>> cadfd36998eef0bb8f990e4175f1c3a1cf496a27
			detalles: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			estado: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			institucion: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			periodo: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			titulo: new FormControl(['', [Validators.required, Validators.minLength(2)]])

		})

	}


	ngOnInit(): void {
<<<<<<< HEAD
		this.logopencil="https://drive.google.com/uc?export=download&id=1jA2K7nPYax0JVefFmgn8HvsYre_25zie";
		this.logoadd = "https://drive.google.com/uc?export=download&id=11BKh21cSfuiTBDHbY26XH5Ux9TBVYdWm";
		this.logoedu= "https://drive.google.com/uc?export=download&id=1_TzJ4uPlPA_qU9DaaARLKqlLoXVi5pWu";
		this.logosave= "https://drive.google.com/uc?export=download&id=1QjXoDP0V0L7EHnjlfAx5bMFH2T-NbYU7";
		this.logocancel= "https://drive.google.com/uc?export=download&id=1DnHtyYLt7LgH7Nl6HsIOfSh2CDjNiYAE";
		this.logodelete= "https://drive.google.com/uc?export=download&id=1iW5i4HOltXKRwV0Q2qsJp6mrZvmFq0rw";
		this.logoskills= "https://drive.google.com/uc?export=download&id=1XApdWSnN7YZC0Y5B0IybEyefUZ10wTuu";
		this.portfolioData.getdata().subscribe(data => {
		this.myEducacion = data.educacion;
		console.log("getdata-DATA-educacion", this.myEducacion);
		/* this.portfolioData.obtenerDatosEducacion().subscribe(data => {
			this.myEducacion = JSON.stringify(data);
			console.log("JSON:", this.myEducacion);
		}); */
	});
}
=======
		this.portfolioData.getdata().subscribe(data => {
			this.educacionList = data.educacion;
			this.myPortfolio = data.educacion;
			console.log("DATA-educacion", this.myPortfolio);
		})
		//this.portfolioData.obtenerDatoseducacion().subscribe(data => {
		//JSON.stringify(data);
		//console.log("DATA-educacion JSON Datos Personales: " + JSON.stringify(data));
		//      console.log("data: ",data);
		//console.log("miPortafolio", this.miPortafolio);
		//});
	}


>>>>>>> cadfd36998eef0bb8f990e4175f1c3a1cf496a27


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

		console.log("valueFormDetalles: ", valueForms[0].value);
		console.log("valueFormEstado: ", valueForms[1].value);
		console.log("valueFormInstitucion: ", valueForms[2].value);
		console.log("valueFormPeriodo: ", valueForms[3].value);
		console.log("valueFormTitulo: ", valueForms[4].value);

		this.modoNuevoRegistro = true;

	}



	onEdit(id: any, i: number, event: Event) {
		this.editID = id;
		this.i = i;
		console.log("i", i);
		console.log("editID", this.editID);
		console.log("this.form.value: ", this.form.value);
		console.log("id: ", id);

		this.form.setValue({
			detalles: this.miPortafolio[i].detalles,
			estado: this.miPortafolio[i].estado,
			institucion: this.miPortafolio[i].institucion,
			periodo: this.miPortafolio[i].periodo,
			titulo: this.miPortafolio[i].titulo
		})

		console.log("this.form.value: ", this.form.value);



		this.modoEdicion = true;


	}



	onSaveEdit(event: Event) {
		event.preventDefault;
		/*   this.portfolioData.puteducacion(this.form.value, this.editID).subscribe(data => {
			console.log("this.form.value: " , this.form.value);
			console.log("id: " , this.editID);
			console.log("EDUCACIÓN method PUT Data Editada", data);
	  
			this.portfolioData.obtenerOneDatoseducacion(this.editID).subscribe(data => {
			  console.log("Dato: " + JSON.stringify(data));
			  this.miPortafolio[this.i]=data;
			  console.log("miPortafolio[i : ", this.miPortafolio[this.i]);
			});
	  
		  }); */
		this.modoEdicion = false;

	}



	onSaveNewNuevoRegistro(event: Event) {
		event.preventDefault;
		/* this.portfolioData.posteducacion(this.form.value).subscribe(data => {
		  console.log("this.form.value: " , this.form.value);
		  console.log("AcercaDe method post Data", data);
	 
		  this.portfolioData.obtenerDatoseducacion().subscribe(data => {
			this.miPortafolio=data;
		  });
		});
	 */
		this.modoNuevoRegistro = false;
	}



	onDelete(i: number, event: Event) {
		this.i = i;
		this.modoEdicion = false;
		event.preventDefault;
		Swal.fire({
			title: `¿ELIMINAR EDUCACIÓN ${(this.miPortafolio[i].titulo).toUpperCase()}?`,
			text: "No podrá revertir los cambios.",
			icon: 'warning',
			confirmButtonColor: '#d33',
			confirmButtonText: 'Si, Eliminar.',
			showCancelButton: true,
			cancelButtonText: 'Cancelar',
			cancelButtonColor: '#00b5ff'
		}).then((result) => {
			/* if (result.isConfirmed) {
				this.portfolioData.deleteeducacion(this.miPortafolio[i].id).subscribe(data => {
					console.log("Borrando registro", data);

					this.portfolioData.obtenerDatoseducacion().subscribe(data => {
						this.miPortafolio = data;
					});

				});
				Swal.fire({
					title: 'ITEM ELIMINADO',
					icon: 'success',
					showConfirmButton: false,
					timer: 1000
				})
			} */
			console.log("borrando registro");
			
		})
	}



	onCancelNuevoRegistro() {
		this.modoNuevoRegistro = false;
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


		this.modoEdicion = false;
	}


}
