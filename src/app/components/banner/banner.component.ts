import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from 'src/app/services/portfolio.service';
import Swal from 'sweetalert2';
import { Ipersona } from './../../interfaces/ipersona';
import { Iaboutme } from './../../interfaces/iaboutme';

@Component({
	selector: 'app-banner',
	templateUrl: './banner.component.html',
	styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

	myPersona: any;
	myAboutMe: any;
	modeEdition: boolean = false;
	modeNewRecord: boolean = false;
	form: FormGroup;
	alertaDelete: string = "¿Eliminar información AcercaDe?"

	constructor(private portfolioData: PortfolioService, private formBuilder: FormBuilder) {
		this.form = new FormGroup({
			fullname: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			posicion: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			descripcion: new FormControl(['', [Validators.required, Validators.minLength(2)]])
		})
	}

	ngOnInit(): void {
		this.portfolioData.getdata().subscribe(data => {
			// this.myAboutMe = JSON.stringify(data);
			this.myAboutMe = data.aboutme;
			console.log("obtenerDatosAboutMe: ", this.myAboutMe);
			this.myPersona = data.persona;console.log(this.myPersona);
			// this.myPersona = JSON.stringify(data);
		});
	

	}
	onDelete(id: any, event: Event) {
		this.modeEdition = false;
		event.preventDefault;
		Swal.fire({
			title: '¿Desea Eliminar la información Acerca De?',
			text: "No podrá revertir los cambios.",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'ELIMINAR'
		}).then((result) => {
			if (result.isConfirmed) {
				this.portfolioData.deleteAboutMe(id).subscribe(data => {
					console.log("Borrando registro", data);

					this.portfolioData.obtenerDatosAboutMe().subscribe(data => {
						this.myAboutMe = data;
					});

				});


				Swal.fire(
					'ELIMINADO',
					'La Información Acerca De ha sido eliminada con éxito.',
					'success'
				)
			}
		})

	}
}
