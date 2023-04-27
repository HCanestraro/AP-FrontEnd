import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
<<<<<<< HEAD
import { AngularFireModule } from '@angular/fire/compat';
import { environments } from './../environments/environments';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
=======

import { AppRoutingModule } from './app-routing.module';
>>>>>>> cadfd36998eef0bb8f990e4175f1c3a1cf496a27
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BannerComponent } from './components/banner/banner.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { LoginComponent } from './components/login/login.component';
import { PortfolioService } from './services/portfolio.service';
import { Che404Component } from './components/che404/che404.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { SkillsComponent } from './components/skills/skills.component';
import { SoftskillsComponent } from './components/softskills/softskills.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
// import { CloudinaryModule } from "@cloudinary/ng";
import { Datastore } from '@google-cloud/datastore';

<<<<<<< HEAD
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { ChelibComponent } from './components/chelib/chelib.component';
// import { CloudinaryConfig } from '@cloudinary/url-gen';
import { HotToastModule } from '@ngneat/hot-toast';
import { getStorage, provideStorage } from '@angular/fire/storage';

const materialModules = [
	MatButtonModule,
	MatCardModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatSliderModule,
	MatToolbarModule,
	MatIconModule,
	MatFormFieldModule,
	MatMenuModule
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
		// CloudinaryModule,
		materialModules,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		BrowserAnimationsModule,
		// provideAuth(() => getAuth()),
		provideFirestore(() => getFirestore()),
		provideStorage(() => getStorage()), 
  		HotToastModule.forRoot()
		// FontAwesomeModule
	],
	providers: [],
	bootstrap: [AppComponent],

=======
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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  
>>>>>>> cadfd36998eef0bb8f990e4175f1c3a1cf496a27
})
export class AppModule { }
