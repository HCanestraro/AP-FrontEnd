import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from './../environments/environments';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BannerComponent } from './components/banner/banner.component';

import { PortfolioService } from './services/portfolio.service';
import { Che404Component } from './components/che404/che404.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { SkillsComponent } from './components/skills/skills.component';
import { SoftskillsComponent } from './components/softskills/softskills.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { LoginComponent } from './components/login/login.component';
import { CloudinaryModule } from "@cloudinary/ng";

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChelibComponent } from './components/chelib/chelib.component';
import { CloudinaryConfig } from '@cloudinary/url-gen';
const materialModules = [
	MatButtonModule,
	MatCardModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatSliderModule
];

@NgModule({
	declarations: [
		AppComponent,
		FooterComponent,
		NavbarComponent,
		BannerComponent,
		Che404Component,
		EducacionComponent,
		ExperienciaComponent,
		SkillsComponent,
		SoftskillsComponent,
		ProyectosComponent,
		PortfolioComponent,
		LoginComponent,
		ChelibComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		CloudinaryModule,
		materialModules,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		BrowserAnimationsModule,
		// FontAwesomeModule
	],
	providers: [],
	bootstrap: [AppComponent],

})
export class AppModule { }
