import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { ApiInterceptorService } from './services/api-interceptor.service'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './routes/user/home-page/home-page.component';
import { LoginPageComponent } from './routes/user/login-page/login-page.component';
import { SignupPageComponent } from './routes/user/signup-page/signup-page.component';
import { PageNotFoundComponent } from './routes/error/page-not-found/page-not-found.component';
import { ProductsComponent } from './components/products/products.component';
import { HeaderComponent } from './components/header/header.component';
import { UsersComponent } from './layout/users/users.component';
import { ProfilePageComponent } from './routes/user/profile-page/profile.component';
import { UsersPageComponent } from './routes/admin/users-page/users-page.component';
import { SingleUserPageComponent } from './routes/admin/single-user-page/single-user-page.component';
import { AdminComponent } from './layout/admin/admin.component';
import { LoginComponent } from './routes/admin/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    SignupPageComponent,
    PageNotFoundComponent,
    ProductsComponent,
    HeaderComponent,
    UsersComponent,
    ProfilePageComponent,
    UsersPageComponent,
    SingleUserPageComponent,
    AdminComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptorService, multi: true }  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
