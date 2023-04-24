import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  urlLogin="localhost:4200/";
  urlNuevo="localhost:4200/";
  usuario: BehaviorSubject<any>;
  xu!: Observable<any>;
  constructor(private http:HttpClient) {
    console.log("CHE: AUTHENTICATION SERVICE...");
    this.usuario=new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('token') || '{}'));
    console.log("CHE USER BEHAVIORSUBJECT:", this.usuario);
   }

   login(credenciales:any): Observable<any> {
     console.log("CHE: Archivo Authentication Service , credenciales:",
     credenciales);
     this.xu=this.http.post(this.urlLogin, credenciales).pipe(map(data => {
      this.usuario.next(data);
    }))
    console.log("CHE XU: ",this.xu);
    return this.http.post(this.urlLogin, credenciales);
   }
  
   register(credenciales:any): Observable<any> {
    return this.http.post(this.urlNuevo, credenciales);
   }

   token() {
    console.log("CHE AUTENTICACION Service, token(): ",
    sessionStorage.getItem('token'));
    return sessionStorage.getItem('token');
   }

   setToken(token:string): void {
    console.log("CHE: SETTOKEN: ", token);
    sessionStorage.setItem('token', token);
   }

   removeToken(): void {
    sessionStorage.removeItem('token');
    console.log("Token removido, desde Archivo Authentication Service",
    sessionStorage.getItem('token'));
   }

   public logout(): void{
    window.localStorage.removeItem('token');
    // this.router.navigate(['']);
  }
}
