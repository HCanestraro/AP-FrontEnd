import { Component, OnInit } from '@angular/core';
import { PortfolioService } from './../../services/portfolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

	myExperiencia: any;
	modoNuevoRegistro: boolean=false;

	constructor( private portfolioData: PortfolioService) {}
	ngOnInit(): void {
		this.portfolioData.getdata().subscribe(data => {
			this.myExperiencia = data.experiencia;
			
			console.log("DATA-Experiencia", this.myExperiencia);
		})}
		onCrear() {}
	}		
