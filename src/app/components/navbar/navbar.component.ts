import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	portfolioActive: Boolean = true;
	autenticacionService: any;

	constructor( private router: Router) {}

	ngOnInit(): void {
		console.log("CHE RUTA ACTIVA: ", this.router.url);
		
	}
	
	logout( event : Event){
    event.preventDefault;
    Swal.fire({
      title: '¿CERRAR SESIÓN?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#747174',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#00b5ff',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem('token');
         this.autenticacionService.removeToken();
          console.log("Token removido, notifico desde archivo banner", sessionStorage.getItem('token'));
          this.router.navigate(['/login']);
          }
        }
      )

  }
}
