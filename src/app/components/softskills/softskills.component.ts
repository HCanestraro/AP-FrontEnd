import { Component, OnInit } from '@angular/core';
import { PortfolioService } from './../../services/portfolio.service';

@Component({
  selector: 'app-softskills',
  templateUrl: './softskills.component.html',
  styleUrls: ['./softskills.component.css']
})
export class SoftskillsComponent implements OnInit {

  mySoftskills: any;
	modeNewRecord: boolean = false;
	constructor( private portfolioData: PortfolioService) {}
	ngOnInit(): void {
		this.portfolioData.getdata().subscribe(data => {
			this.mySoftskills = data.softskills;
			
			console.log("DATA-Softskills", this.mySoftskills);
		})}
}
