import { Component, OnInit } from '@angular/core';
import { PortfolioService } from './../../services/portfolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent  implements OnInit {
  mySkills: any;

	constructor( private portfolioData: PortfolioService) {}
	ngOnInit(): void {
		this.portfolioData.getdata().subscribe(data => {
			this.mySkills = data.skills;
			
			console.log("DATA-skills", this.mySkills);
		})}
}
