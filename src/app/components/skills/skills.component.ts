import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from './../../services/portfolio.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-skills',
	templateUrl: './skills.component.html',
	styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

	mySkills: any;
	modeNewRecord: boolean = false;
	editID = 1;
	i!: any;
	modeEdition: boolean = false;
	form: FormGroup;

	constructor(public portfolioData: PortfolioService) {
		this.form = new FormGroup ({
			name: new FormControl (['', [Validators.required, Validators.minLength(2)]]),
			urlImage: new FormControl ([''], [Validators.required, Validators.minLength(2)]),
			level: new FormControl (['', [Validators.required, Validators.minLength(2)]])
		});
	}

	ngOnInit(): void {
<<<<<<< HEAD
		this.logopencil="https://drive.google.com/uc?export=download&id=1jA2K7nPYax0JVefFmgn8HvsYre_25zie";
		this.logoadd= "https://drive.google.com/uc?export=download&id=11BKh21cSfuiTBDHbY26XH5Ux9TBVYdWm";
		this.logoedu= "https://drive.google.com/uc?export=download&id=1_TzJ4uPlPA_qU9DaaARLKqlLoXVi5pWu";
		this.logosave= "https://drive.google.com/uc?export=download&id=1QjXoDP0V0L7EHnjlfAx5bMFH2T-NbYU7";
		this.logocancel= "https://drive.google.com/uc?export=download&id=1DnHtyYLt7LgH7Nl6HsIOfSh2CDjNiYAE";
		this.logodelete= "https://drive.google.com/uc?export=download&id=1iW5i4HOltXKRwV0Q2qsJp6mrZvmFq0rw";
		this.logoskills= "https://drive.google.com/uc?export=download&id=1XApdWSnN7YZC0Y5B0IybEyefUZ10wTuu";
		
=======
>>>>>>> cadfd36998eef0bb8f990e4175f1c3a1cf496a27
		this.portfolioData.getdata().subscribe(data => {
			this.mySkills = data.skills;
			console.log("getdata-DATA-skills:", this.mySkills);
		})
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


		console.log("valueFormDetalles: ", valueForms[0].value);
		console.log("valueFormUrlImage: ", valueForms[1].value);
		console.log("valueFormEstado: ", valueForms[2].value);

		this.modeNewRecord = true;
	}

	onEdit(id: number, i: number, event: Event) {
		this.editID = id;
		this.i = i;
		console.log("i", i);
		console.log("editID", this.editID);
		console.log("this.form.value: ", this.form.value);
		console.log("id: ", id);

		this.form.setValue({
			name: this.mySkills[i].name,
			urlImage: this.mySkills[i].urlImage,
			level: this.mySkills[i].level
		})

		console.log("this.form.value: ", this.form.value);

		this.modeEdition = true;

	}


	onSaveEdit(event: Event) {
		event.preventDefault;
		this.portfolioData.putSkill(this.form.value, this.editID).subscribe(data => {
			console.log("this.form.value: ", this.form.value);
			console.log("id: ", this.editID);
			console.log("SKILL method PUT Data Editada", data);

			this.portfolioData.obtenerOneDatosSkill(this.editID).subscribe(data => {
				console.log("Dato: " + JSON.stringify(data));
				this.mySkills[this.i] = data;
				console.log("mySkills[i : ", this.mySkills[this.i]);
			});

		});
		this.modeEdition = false;
	}



	onSaveNewNuevoRegistro(event: Event) {
		event.preventDefault;
		this.portfolioData.postSkill(this.form.value).subscribe(data => {
			console.log("this.form.value: ", this.form.value);
			console.log("SKILL method POST Data Enviada", data);

			this.portfolioData.obtenerDatosSkills().subscribe(data => {
				this.mySkills = data;
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


		console.log("valueFormDetalles: ", valueForms[0].value);
		console.log("valueFormEstado: ", valueForms[1].value);

		this.modeEdition = false;
	}


	onDelete(i: any, event: Event) {
		this.i = i;
		this.modeEdition = false;
		event.preventDefault;
		Swal.fire({
			title: `¿ELIMINAR SKILL ${(this.mySkills[i].tecnologia).toUpperCase()}?`,
			text: "No podrá revertir los cambios.",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#00b5ff',
			confirmButtonText: 'Si, Eliminar.',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.isConfirmed) {
				this.portfolioData.deleteSkill(this.mySkills[i].id).subscribe(data => {
					console.log("Borrando registro", data);

					this.portfolioData.obtenerDatosSkills().subscribe(data => {
						this.mySkills = data;
					});

				});

				Swal.fire({
					title: 'ITEM ELIMINADO',
					icon: 'success',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})
	}




}
