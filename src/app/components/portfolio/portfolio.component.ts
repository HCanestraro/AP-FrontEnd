import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth } from 'firebase/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
@Component({
	selector: 'app-portfolio',
	templateUrl: './portfolio.component.html',
	styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
	constructor(private afAuth: AngularFireAuth,private firebaseService: FirebaseService) {}
	user = getAuth().currentUser;
	ngOnInit(): void {
		console.log('DEBUG: PORTFOLIO');
		if (this.user) {
			console.log('DEBUG: Portfolio USUARIO OK');
		}
		this.firebaseService.obtenerNombresRegistros();
	}
}