import { Component, OnInit } from '@angular/core';
import { PortfolioService } from './../../services/portfolio.service';
// import { Isoftskills } from 'src/app/interfaces/isoftskills';
// import { CheService } from 'src/app/services/che.service';

@Component({
  selector: 'app-softskills',
  templateUrl: './softskills.component.html',
  styleUrls: ['./softskills.component.css']
})
export class SoftskillsComponent implements OnInit {
<<<<<<< HEAD
	logopencil!: String;
	logoadd!: String;
	logoedu!: String;
	logosave!: String;
	logocancel!: String;
	logodelete!: String;
	logoskills!: String;
=======

  mySoftskills: any;
>>>>>>> cadfd36998eef0bb8f990e4175f1c3a1cf496a27
	modeNewRecord: boolean = false;
	mySoftskills: any;
	
	constructor( private portfolioData: PortfolioService) {}
	ngOnInit(): void {
<<<<<<< HEAD
 		this.logopencil="https://drive.google.com/uc?export=download&id=1jA2K7nPYax0JVefFmgn8HvsYre_25zie";
		this.logoadd= "https://drive.google.com/uc?export=download&id=11BKh21cSfuiTBDHbY26XH5Ux9TBVYdWm";
		this.logoedu= "https://drive.google.com/uc?export=download&id=1_TzJ4uPlPA_qU9DaaARLKqlLoXVi5pWu";
		this.logosave= "https://drive.google.com/uc?export=download&id=1QjXoDP0V0L7EHnjlfAx5bMFH2T-NbYU7";
		this.logocancel= "https://drive.google.com/uc?export=download&id=1DnHtyYLt7LgH7Nl6HsIOfSh2CDjNiYAE";
		this.logodelete= "https://drive.google.com/uc?export=download&id=1iW5i4HOltXKRwV0Q2qsJp6mrZvmFq0rw";
		this.logoskills= "https://drive.google.com/uc?export=download&id=1XApdWSnN7YZC0Y5B0IybEyefUZ10wTuu";
	 
=======
>>>>>>> cadfd36998eef0bb8f990e4175f1c3a1cf496a27
		this.portfolioData.getdata().subscribe(data => {
			this.mySoftskills = data.softskills;
				console.log("getdata-DATA-Softskills", this.mySoftskills);
		})};
}
