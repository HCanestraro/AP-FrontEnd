import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Che404Component } from './components/che404/che404.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
const routes: Routes = [
  { path: '', component: PortfolioComponent},
  { path: '**', component: Che404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
