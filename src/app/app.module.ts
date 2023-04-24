import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
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
  
})
export class AppModule { }
