import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';

import { AuthNavComponent } from './components/auth-nav/auth-nav.component';
import { AuthenticationButtonComponent } from './components/authentication-button/authentication-button.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SignupButtonComponent } from './components/signup-button/signup-button.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AuthNavComponent,
    AuthenticationButtonComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    NavBarComponent,
    SignupButtonComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AuthModule.forRoot({
      ...env.auth,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
