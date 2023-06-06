import { Injectable } from '@angular/core';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router
  ) { }

  async login(email: string, password: string) {
      await this.afAuth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.router.navigate(['portfolio']);
    })
   .catch ((error) => {
      console.log('Error!' + error.message);
    });
  }

  async register(email: string, password: string) {
      await this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
      })
     .catch ((error) => {
      console.log('Error!' + error.message);
    });
  }

  async logout() {
    await this.afAuth.signOut();
    this.router.navigate(['login']);
  }

}