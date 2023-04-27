import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
<<<<<<< HEAD
import { DomSanitizer } from '@angular/platform-browser';
// import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
// import { fill } from "@cloudinary/url-gen/actions/resize";
// import { CloudinaryImageComponent } from '@cloudinary/ng';
=======
>>>>>>> cadfd36998eef0bb8f990e4175f1c3a1cf496a27

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})

export class BannerComponent implements OnInit {

<<<<<<< HEAD
	// img!: CloudinaryImage;
	myPortfolio: any;
	myPersona: any;
	myAboutMe: any;
	logopencil!: String;
	logoadd!: String;
	logoedu!: String;
	logosave!: String;
	logocancel!: String;
	logodelete!: String;
	logoskills!: String;

	constructor(private portfolioData: PortfolioService, private sanitizer: DomSanitizer) { }

	ngOnInit(): void 
	{
		this.logopencil="https://drive.google.com/uc?export=download&id=1jA2K7nPYax0JVefFmgn8HvsYre_25zie";
		this.logoadd= "https://drive.google.com/uc?export=download&id=11BKh21cSfuiTBDHbY26XH5Ux9TBVYdWm";
		this.logoedu= "https://drive.google.com/uc?export=download&id=1_TzJ4uPlPA_qU9DaaARLKqlLoXVi5pWu";
		this.logosave= "https://drive.google.com/uc?export=download&id=1QjXoDP0V0L7EHnjlfAx5bMFH2T-NbYU7";
		this.logocancel= "https://drive.google.com/uc?export=download&id=1DnHtyYLt7LgH7Nl6HsIOfSh2CDjNiYAE";
		this.logodelete= "https://drive.google.com/uc?export=download&id=1iW5i4HOltXKRwV0Q2qsJp6mrZvmFq0rw";
		this.logoskills= "https://drive.google.com/uc?export=download&id=1XApdWSnN7YZC0Y5B0IybEyefUZ10wTuu";

		// Create a Cloudinary instance, setting some Cloud and URL configuration parameters.
		// const cld = new Cloudinary({
			// cloud: {
				// cloudName: 'demo'
			// }
		// });
		// cld.image returns a CloudinaryImage with the configuration set.
		// this.img = cld.image("docs/models");
		// this.img.resize( fill().width(250).height(250));

		// The URL of the image is: https://res.cloudinary.com/demo/image/upload/sample
		// }

		this.portfolioData.getdata().subscribe(data => {
			this.myPortfolio = data;
			this.myPersona = data.persona;
			console.log(this.myPersona);

			this.myAboutMe = data.aboutme;
			console.log(this.myAboutMe);
			
	});
	};

	cheSeg(curl: string) {
		// const url = curl;
		return this.sanitizer.bypassSecurityTrustUrl(curl);
		// return urlSegura;
	}
=======
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

>>>>>>> cadfd36998eef0bb8f990e4175f1c3a1cf496a27
}
	