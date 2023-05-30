import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Che404Component } from './components/che404/che404.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { chelibComponent } from "./components/chelib/chelib.component";
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { SkillsComponent } from './components/skills/skills.component';
const routes: Routes = [
  { path: '', component: PortfolioComponent},
  { path: '**', component: Che404Component },
  { path: 'chelib', component: chelibComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-profile', component: UserProfileComponent},
  { path: 'footer', component: FooterComponent},
  { path: 'banner', component: BannerComponent},
  { path: 'skills', component: SkillsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
