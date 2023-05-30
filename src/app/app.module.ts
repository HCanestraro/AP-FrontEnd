import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from './../environments/environments';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
// import { Datastore } from '@google-cloud/datastore';

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
import { chelibComponent } from './components/chelib/chelib.component';
// import { CloudinaryConfig } from '@cloudinary/url-gen';
import { HotToastModule } from '@ngneat/hot-toast';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
// import { AboutMeComponent } from './components/about-me/about-me.component';
// import { ContactFormComponent } from './components/contact-form/contact-form.component';

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
	declarations:[
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
		chelibComponent,
  UserProfileComponent,
//   AboutMeComponent,
//   ContactFormComponent
	],

	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		// CloudinaryModule,
		materialModules,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		// provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
		BrowserAnimationsModule,
		// provideAuth(() => getAuth()),
		provideFirestore(() => getFirestore()),
		provideStorage(() => getStorage()), 
  		// HotToastModule.forRoot(),
		// FontAwesomeModule
	],
	providers: [],
	bootstrap: [AppComponent],

})
export class AppModule { }
