import { Component, OnInit } from '@angular/core';
import { PortfolioService } from './../../services/portfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent  implements OnInit  {
  myProyectos: any;

	constructor( private portfolioData: PortfolioService) {}
	ngOnInit(): void {
		this.portfolioData.getdata().subscribe(data => {
			this.myProyectos = data.proyectos;
			
			console.log("DATA-proyectos", this.myProyectos);
		})}

}
