import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-che404',
	templateUrl: './che404.component.html',
	styleUrls: ['./che404.component.css']
})
export class Che404Component implements OnInit {
cheerror:any;

	constructor( private route: ActivatedRoute) {}

	ngOnInit(): void {
		// this.cheerror=`${this.route.snapshot.url.join('/')}`;
		// alert(this.cheerror);		
	}
}
