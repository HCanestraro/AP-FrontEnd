import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	portfolioActive: Boolean = true;
	autenticacionService: any;

	constructor( private router: Router, private sanitizer: DomSanitizer) { }

	ngOnInit(): void {
		console.log("CHE RUTA ACTIVA: ", this.router.url);
		
	}

	/* getImageUrl(user: User, width: Number, height: Number, size: string): any {

		if (user && user !== null && user.profilePicture && user.profilePicture !== '') {
		  if (this.sanitizer) {
			return this.sanitizer.bypassSecurityTrustUrl(
			  `${CONFIG.functionsUrl}/user/profile/${user.userId}/${user.profilePicture}/${width}/${height}`
			);
		  } else {
			return `${CONFIG.functionsUrl}/user/profile/${user.userId}/${user.profilePicture}/${width}/${height}`;
		  }
		} else {
		  if (isPlatformBrowser(this.platformId) === false && isPlatformServer(this.platformId) === false) {
			return `~/assets/images/avatar-${size}.png`;
		  } else {
			return `assets/images/avatar-${size}.png`;
		  }
		}
	  } */
	
	  sanitizeReceiptImage(imagePath: string) {
	  return this.sanitizer.bypassSecurityTrustUrl(imagePath);
	}

	cheSeg( imagePath: string ) {
		return this.sanitizer.bypassSecurityTrustUrl(`imagePath`);
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
