import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
	selector: 'app-banner',
	templateUrl: './banner.component.html',
	styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

	myPortfolio:any;
	myPersona:any;
	myAboutMe:any;

	constructor( private portfolioData: PortfolioService ) {}

	ngOnInit(): void {
		this.portfolioData.getdata().subscribe(data => {
			this.myPortfolio = data;
			console.log(this.myPortfolio);
			
			this.myPersona=data.persona;
			console.log("myPersona:",this.myPersona);
			console.log("myPersona:",this.myPersona[0]);
			this.myAboutMe=data.aboutme;
			console.log("aboutme:",this.myAboutMe);
			console.log("aboutme:",this.myAboutMe[0]);
			
			
		});
	}
}
