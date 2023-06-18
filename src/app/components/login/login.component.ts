import { Component} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import firebase from 'firebase/compat/app';
import { User , GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import   auth  from 'firebase/compat/app';
import * as firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})

export class LoginComponent {
	email!: string;
	password!: string;
	user: firebase.default.User | null = null;
	
	logopencil="https://drive.google.com/uc?export=download&id=1jA2K7nPYax0JVefFmgn8HvsYre_25zie";
	logoadd="https://drive.google.com/uc?export=download&id=11BKh21cSfuiTBDHbY26XH5Ux9TBVYdWm";
	logoedu="https://drive.google.com/uc?export=download&id=1_TzJ4uPlPA_qU9DaaARLKqlLoXVi5pWu   ";
	logosave="https://drive.google.com/uc?export=download&id=1QjXoDP0V0L7EHnjlfAx5bMFH2T-NbYU7";
	logocancel="https://drive.google.com/uc?export=download&id=1DnHtyYLt7LgH7Nl6HsIOfSh2CDjNiYAE";
	logodelete="https://drive.google.com/uc?export=download&id=1iW5i4HOltXKRwV0Q2qsJp6mrZvmFq0rw";
		


	constructor(private afAuth: AngularFireAuth) {
		this.afAuth.authState.subscribe(user => {
			this.user = user;
		});
	}
	
	login() {
		this.afAuth.signInWithEmailAndPassword(this.email, this.password)
			.then(() => {
				console.log('Inicio de sesión exitoso');
				this.email = '';
				this.password = '';
			})
			.catch(error => console.error('Error al iniciar sesión', error));
	}

	logout() {
		this.afAuth.signOut()
			.then(() => {
				console.log('Cierre de sesión exitoso');
			})
			.catch(error => console.error('Error al cerrar sesión',error));
	}

	loginWithGoogle() {
		const provider = new GoogleAuthProvider();
		this.afAuth.signInWithPopup(provider)
			.then(() => {
				console.log('Inicio de seción con Google exitoso');
			})
			.catch(error => console.error('Error al iniciar con Google',error));
	}

	loginWithGitHub() {
		const provider = new GithubAuthProvider();
		this.afAuth.signInWithPopup(provider)
			.then(() => {
				console.log('Inicio de sesión con Google exitoso');
			})
			.catch(error => console.error('Error al iniciar con GitHub',error));
	}

	resetPassword() {
		this.afAuth.sendPasswordResetEmail(this.email)
			.then(() => {
				console.log('Se ha enviado un correo electrónico para restablecer la contraseña');
			})
			.catch(error => console.error('Error al enviar el correo electrónico'));
	}
}