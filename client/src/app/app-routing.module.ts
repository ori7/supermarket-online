import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RegisterStepOneComponent } from './components/register/register-step-one/register-step-one.component';
import { RegisterStepTwoComponent } from './components/register/register-step-two/register-step-two.component';
import { ShopingComponent } from './components/shoping/shoping.component';
import { LoggedGuard } from './guards/logged.guard';
import { LogOutComponent } from './components/log-out/log-out.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path: '', component: MainPageComponent, pathMatch: 'full' },
  { path: 'login', component: MainPageComponent },
  { path: 'register1', component: RegisterStepOneComponent },
  { path: 'register2', component: RegisterStepTwoComponent },
  { path: 'logOut', component: LogOutComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'shoping', component: ShopingComponent, canActivate: [LoggedGuard] },
  { path: 'refrsh', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }