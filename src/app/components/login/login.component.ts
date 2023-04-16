import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormsModule, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})

export class LoginComponent implements OnInit {
  
  usuario = {
    email: '',
    password: ''
  }
  form: FormGroup;
  formBuilder: any;

  constructor( private authService: AuthService ) {
    this.form = this.formBuilder.group( 
      {
        email: ['', [Validators.required, Validators.email]],
        nombreUsuario: ['', [Validators.required, Validators.minLength(2)]],
        password: ['', [Validators.required, Validators.minLength(8)]]
      } ) 
   }

  register() {
    console.log(this.usuario);
    const {email, password}= this.usuario;
    this.authService.register(email,password).then(res => {
      console.log("YoProgramo:FIREBASE:se registro:",res);
    });
  }
  

  Ingresar() {
    console.log(this.usuario);
    const {email, password}= this.usuario;
    this.authService.login(email,password).then(res => {
      console.log("YoProgramo:FIREBASE:se registro:",res);
    });
  }
  
  IngresarConGoogle() {
    console.log(this.usuario);
    const {email, password}= this.usuario;
    this.authService.loginWithGoogle(email,password).then(res => {
      console.log("YoProgramo:Ingresar con google-FIREBASE:se registro:",res);
    });
  }

  obtenerUsuarioLogeado() {
    this.authService.getUserLogged().subscribe(res => {
      console.log("YoProgramo: FIREBASE-Usuario logeado: ",res?.email);
    })
  }

  logout() {
    console.log("YoProgramo: FIREBASE-Usuario LOGOUT:");
    this.authService.logout();
  }

  ngOnInit(): void {
  }

} 