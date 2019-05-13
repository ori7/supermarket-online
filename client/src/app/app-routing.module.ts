import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RegisterStepOneComponent } from './components/register/register-step-one/register-step-one.component';
import { RegisterStepTwoComponent } from './components/register/register-step-two/register-step-two.component';
import { ShopingComponent } from './components/shoping/shoping.component';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  { path: '', component: MainPageComponent, pathMatch: 'full' },
  { path: 'login', component: MainPageComponent },
  { path: 'register1', component: RegisterStepOneComponent },
  { path: 'register2', component: RegisterStepTwoComponent },
  { path: 'shoping', component: ShopingComponent, canActivate: [LoggedGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }