import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
// import { UsersService } from 'src/app/services/users.service';
// import { FirebaseService } from 'src/app/services/firebase.service';
@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	form: FormGroup;
	// user = FirebaseService.auth().currentUser;
	constructor(private formBuilder: FormBuilder, private autenticacionService: AutenticacionService, private firestore: AngularFirestore, private afAuth: AngularFireAuth, private router: Router) { 
		this.form=this.formBuilder.group({
			email: ['', [Validators.required,Validators.minLength(8)]],/* , Validators.email */
			firstName: ['', [Validators.required, Validators.minLength(2)]],
			lastName: ['', [Validators.required, Validators.minLength(2)]],
			displayName: ['', [Validators.required, Validators.minLength(2)]],
			phone: ['', [Validators.required, Validators.minLength(2)]],
			address: ['', [Validators.required, Validators.minLength(2)]],
			photoURL: ['', [Validators.required, Validators.minLength(2)]],
			password: ['', [Validators.required, Validators.minLength(8)]]
		  })
	}

	ngOnInit(): void {
		console.log('DEBUG: REGISTER');
	}
	register() {
		console.log('DEBUG: REGISTER');
		const { email, firstName, lastName,displayName,phone,address,photoURL, password } = this.form.value;
		this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
			.then(userCredential => {
				if (userCredential) {
					const userId = userCredential.user?.uid;
					if (userId) {
						// const userId = firebase.auth().user.uid;
						const id1 = this.firestore.createId();
						this.firestore.collection('users').doc(userId).set({
							id: userId,
							email: this.email,
							firstName: this.firstName,
							lastName: this.lastName,
							displayName: this.displayName,
							phone: this.phone,
							address: this.address,
							photoURL: this.photoURL
						})
							.then(() => {
								// Registro exitoso, puedes redirigir al usuario a otra página
								console.log('Registro exitoso, puedes redirigir al usuario a otra página');
								
								// this.router.navigate(['/login']);
							})
							.catch(error => {
								// Error al guardar los datos del usuario, muestra el mensaje de error al usuario
								console.error('Error al guardar los datos del usuario, muestra el mensaje de error al usuario');
							});
					}
				}
			})
      .catch (error => {
		console.error('Error en el registro, muestra el mensaje de error al usuario',error);
						// Error en el registro, muestra el mensaje de error al usuario
					});
	}
	get email(): any {
		return this.form.get('email');
	}
	get firstName(): any {
		return this.form.get('firstName');
	}
	get lastName(): any {
		return this.form.get('lastName');
	}
	get displayName(): any {
		return this.form.get('displayName');
	}
	get phone(): any {
		return this.form.get('phone');
	}
	get address(): any {
		return this.form.get('address');
	}
	get photoURL(): any {
		return this.form.get('photoURL');
	}
	get password(): any {
		return this.form.get('password');
	}
	cancelar(): void {
		this.router.navigate(['/login']);
	}
	onRegister(event:Event ){
		event.preventDefault;
		this.autenticacionService.registro(this.form.value).subscribe(data => {
			sessionStorage.setItem('token', data.token);
			this.autenticacionService.setToken(data.token);
			console.log("Archivo Register Component: ", data);
			this.register();
		this.router.navigate(['/login']);
		});
	   } 
}
