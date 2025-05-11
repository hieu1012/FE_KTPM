import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginScreen } from './login-screen/loginScreen.component';
import { RegisterScreen } from './register-screen/registerScreen.component';
import { HomeScreen } from './home-screen/homeScreen.component';
import { ROUTING } from '../constants/routing';
import { AboutComponent } from './about-us/about.component';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailProductComponent } from './detail-product/detail-product.component';

export const routes: Routes = [
    { path: '', redirectTo: ROUTING.LOGIN_SCREEN, pathMatch: 'full' },
    { path: ROUTING.HOME_SCREEN, component: HomeScreen },
    { path: ROUTING.REGISTER_SCREEN, component: RegisterScreen },
    { path: ROUTING.LOGIN_SCREEN, component: LoginScreen },
    { path: ROUTING.ABOUT_SCREEN, component: AboutComponent },
    { path: `${ROUTING.CATALOG}/:categoryss`, component: CatalogComponent },
    { path: `${ROUTING.DETAIL_PRODUCT}/:id`, component: DetailProductComponent },
];


export class AppRoutingModule { }

