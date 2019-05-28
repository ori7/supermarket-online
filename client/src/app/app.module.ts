import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login-registration/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { GeneralInformationComponent } from './components/general-information/general-information.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RegisterStepOneComponent } from './components/login-registration/register/register-step-one/register-step-one.component';
import { RegisterStepTwoComponent } from './components/login-registration/register/register-step-two/register-step-two.component';
import { ShopingComponent } from './components/main-shoping/shoping/shoping.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { LogOutComponent } from './components/login-registration/log-out/log-out.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProductItemComponent } from './components/products/product-item/product-item.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';
import { CartComponent } from './components/main-shoping/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    AboutComponent,
    GeneralInformationComponent,
    MainPageComponent,
    RegisterStepOneComponent,
    RegisterStepTwoComponent,
    ShopingComponent,
    LogOutComponent,
    AdminComponent,
    ProductItemComponent,
    ProductsListComponent,
    AddProductComponent,
    UpdateProductComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }