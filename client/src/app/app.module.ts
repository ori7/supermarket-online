import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { GeneralInformationComponent } from './components/general-information/general-information.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RegisterStepOneComponent } from './components/register/register-step-one/register-step-one.component';
import { RegisterStepTwoComponent } from './components/register/register-step-two/register-step-two.component';
import { ShopingComponent } from './components/shoping/shoping.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

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