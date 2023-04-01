import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PortfolioService {

	// url = 'localhost:4200';
	
	constructor( private http: HttpClient ) { }
	getdata(): Observable<any> {
		return this.http.get('./../../assets/data/data.json');
	}
}
