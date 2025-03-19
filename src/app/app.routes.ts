import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginScreen } from './LoginScreen/loginScreen.component';
import { RegisterScreen } from './RegisterScreen/registerScreen.component';
import { HomeScreen } from './HomeScreen/homeScreen.component';
import { ROUTING } from '../constants/routing';
import { AboutComponent } from './About-Us/about.component';

export const routes: Routes = [
    { path: ROUTING.HOME_SCREEN, component: HomeScreen },
    { path: ROUTING.REGISTER_SCREEN, component: RegisterScreen },
    { path: ROUTING.LOGIN_SCREEN, component: LoginScreen },
    { path: ROUTING.ABOUT_SCREEN, component: AboutComponent }
];


export class AppRoutingModule { }

