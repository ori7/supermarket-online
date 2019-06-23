import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page-view/main-page.component';
import { RegisterStepOneComponent } from './components/login-registration/register/register-step-one/register-step-one.component';
import { RegisterStepTwoComponent } from './components/login-registration/register/register-step-two/register-step-two.component';
import { ShopingViewComponent } from './components/main-shoping/shoping-view/shoping-view.component';
import { LoggedGuard } from './guards/logged.guard';
import { LogOutComponent } from './components/login-registration/log-out/log-out.component';
import { AdminComponent } from './components/main-admin/admin-view/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { AboutComponent } from './components/main-page/about/about.component';
import { OrderViewComponent } from './components/main-order/order-view/order-view.component';
import { OrderGuard } from './guards/order.guard';

const routes: Routes = [
  { path: '', component: MainPageComponent, pathMatch: 'full' },
  { path: 'login', component: MainPageComponent },
  { path: 'register1', component: RegisterStepOneComponent },
  { path: 'register2', component: RegisterStepTwoComponent },
  { path: 'logOut', component: LogOutComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'shoping/:id', component: ShopingViewComponent, canActivate: [LoggedGuard] },
  { path: 'order/:userId/:cartId', component: OrderViewComponent, canActivate: [OrderGuard] },
  { path: 'refrsh', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }