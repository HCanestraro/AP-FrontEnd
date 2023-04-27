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
  constructor(private portfolioData:PortfolioService) { }

  ngOnInit(): void {
    this.portfolioData.getdata().subscribe(data => {
      this.myPortfolio = data;
	  this.myPersona=data.persona;
	  console.log(this.myPersona);
	  
	  this.myAboutMe=data.aboutme;
	  console.log(this.myAboutMe);
	  
    });
  }

}
