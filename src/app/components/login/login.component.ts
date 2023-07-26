import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { AuthService } from 'src/app/services/auth.service';
import auth from 'firebase/compat/app';
import { GoogleAuthProvider, GithubAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
	registerMode: boolean = false;
	
	form: FormGroup;
	photoURL: any;
	constructor(
		private firestore: AngularFirestore,
		private authService: AuthService,/*  private autenticacionService: AutenticacionService, */ 
		private auth: AngularFireAuth, 
		private router: Router, 
		private formBuilder: FormBuilder) {
		this.form = this.formBuilder.group({
			//email: ['', [Validators.required, Validators.email]],
			email: ['', [Validators.required, Validators.minLength(2)]],
			password: ['', [Validators.required, Validators.minLength(8)]]
		})
	}

	ngOnInit() {	console.log('DEBUG: Login');	}

	get email(): any {
		return this.form.get('email');
	}

	get password(): any {
		return this.form.get('password');
	}
	

	// forgotPassword() {
	// this.auth.sendPasswordResetEmail(this.email)
	// .then(() => {
	// Email de recuperación de contraseña enviado
	// })
	// .catch(error => {
	// Error al enviar el email de recuperación de contraseña, muestra el mensaje de error al usuario
	// });
	// }

	deleteAccount() {
		const user = this.auth.currentUser;
		if (user) {
			user.then((currentUser) => {
				if (currentUser) {
					currentUser.delete()
						.then(() => {
							// Cuenta eliminada correctamente
							console.log('Cuenta eliminada correctamente');
						})
						.catch(error => {
							// Error al eliminar la cuenta, muestra el mensaje de error al usuario
							console.log('Error al eliminar la cuenta, muestra el mensaje de error al usuario');
							console.error('Error:',error);
						});
				}
			});
		}
	}

	onLogin() {
		this.auth.signInWithEmailAndPassword(this.email, this.password)
			.then((userCredential: { user: any; }) => {
				const user = userCredential.user;
				// Aquí puedes filtrar por el Id del usuario
				this.router.navigate(['/portfolio']);

			})
			.catch((error: any) => {
				console.log('Error en inicio de sesión:', error);
			});
		}

		onRegister() 
		{
			const { email, firstName, lastName, displayName, phone, address, photoURL, password } = this.form.value;
			this.auth.createUserWithEmailAndPassword(this.email,this.password)
				.then((userCredential: { user: any; }) => 
				{
					if(userCredential && userCredential.user) 
					{
						const user = userCredential.user; //  ?? null

						//Obtenemos el Id del usuario recién registrado
						const userId = user.uid; //  ?? null
						// Ahora, creamos un objeto con los datos adicionales
						const userData = 
						{
							id: userId,
							email: user.email,
							firstName: user.firstName,
							lastName: user.lastName,
							displayName: user.displayName,
							phone: user.phone,
							address: user.address,
							photoURL: this.photoURL
							// Otros campos
						};

						// Finalmente, guardamos los datos adicionales
						this.firestore.collection('users').doc(userId).set(userData)
							.then(() => 
							{
								console.log('Nuevo usuario registrado y datos grabados en Firestore correctamente.');
							})
							.catch((error) => 
							{
								console.error('Error en el registro:', error);
							});
					}
				});
				// ...
		}

		loginWithGoogle() {
			const provider = new GoogleAuthProvider();
			this.auth.signInWithPopup( provider)
				.then((userCredential: { user: any; }) => {
					const user = userCredential.user;
					// Aquí puedes filtrar por el Id del usuario
				})
				.catch((error: any) => {
					console.log('Error en inicio de sesión:', error);
				});
		}

		loginWithGitHub() {
			const provider = new GithubAuthProvider();
			this.auth.signInWithPopup( provider)
				.then((userCredential: { user: any; }) => {
					const user = userCredential.user;
					// Aquí puedes filtrar por el Id del usuario
				})
				.catch((error: any) => {
					console.log('Error en inicio de sesión:', error);
				});
		}
		toggleRegisterMode() {
			this.registerMode = !this.registerMode;
		}
		// let email1 = document.getElementById("email");
		/* this.autenticacionService.login(this.form.value).subscribe(data => {
			sessionStorage.setItem('token', data.token);
			this.autenticacionService.setToken(data.token);
			console.log("Archivo Login Component , seteo del token: ", data.token);
		}); */
	// 	const { email, password } = this.form.value;
	// 	console.log('DEBUG: Login - onLogin', this.form.value);
	// 	console.log('Email:', this.email, ' Password:', this.password);

	// 	this.auth.signInWithEmailAndPassword(email, password)
	// 			.then((userCredential) => {
	// 				console.log('Inicio de sesión exitoso, puedes redirigir al usuario a otra página');
	// 				this.router.navigate(['/portfolio']);
	// 			})
	// 			.catch((error) => {
	// 				console.log('Error de inicio');
	// 				console.error('Error de inicio de sesión:', error);
	// 				// Error en el inicio de sesión, muestra el mensaje de error al usuario
	// 			});
	// }
	cheFormVistaPrevia() {
		console.log(
			'Email: '+this.email,
			'Contraseña: '+this.password
		);
	}
}