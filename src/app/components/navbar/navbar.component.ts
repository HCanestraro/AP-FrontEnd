import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
=======

>>>>>>> cadfd36998eef0bb8f990e4175f1c3a1cf496a27

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
<<<<<<< HEAD
	portfolioActive: Boolean = true;
	autenticacionService: any;
	loginActive: boolean=true;
	registerActive: boolean=false;
	portafolioActive: boolean=false;
	pageNotFoundActive: boolean=false;
	// subscription?: Subscription;
	// showLogin: boolean = false;
	constructor( private router: Router, private sanitizer: DomSanitizer) { }
=======
	portfolio: Boolean = true;

	constructor( private router: Router) {}
>>>>>>> cadfd36998eef0bb8f990e4175f1c3a1cf496a27

	ngOnInit(): void {
		console.log("CHE HEADER-TOP: ",this.router.url);

		console.log("APLICATION MSG: Ruta activa: ",this.router.url);
		switch(this.router.url) {
		  case '/login': {
			this.loginActive=true;
			this.registerActive=false;
			this.portafolioActive=false;
			this.pageNotFoundActive=false;
			break;
		  }
		  case '/register': {
			this.registerActive=true;
			this.loginActive=false;
			break;
		  }
		  case '/portfolio': {
			this.loginActive=false;
			this.registerActive=false;
			this.portafolioActive=true;
			break;
		  }
		  default: {
			this.loginActive=false;
			this.registerActive=false;
			this.portafolioActive=false;
			this.pageNotFoundActive=true;
			break;
		  }
		} 		
	}
<<<<<<< HEAD

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
	  hasRoute(route:string){
		return this.router.url === route
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
          this.router.navigate(['/']);
          }
        }
      )
=======
>>>>>>> cadfd36998eef0bb8f990e4175f1c3a1cf496a27

}
