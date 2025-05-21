import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginScreen } from './login-screen/loginScreen.component';
import { RegisterScreen } from './register-screen/registerScreen.component';
import { HomeScreen } from './home-screen/homeScreen.component';
import { ROUTING } from '../constants/routing';
import { AboutComponent } from './About-Us/about.component';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { CartComponent } from './cart/cart.component';
import { PaymentSuccessComponent } from './cart/payment-success/payment-success.component';
import { PaymentCancelComponent } from './cart/payment-cancel/payment-cancel.component';
import { HistoryOrderComponent } from './history-order/history-order.component';
import { ProductCategoryComponent } from './product-category/product-category.component';

export const routes: Routes = [
    { path: '', redirectTo: ROUTING.HOME_SCREEN, pathMatch: 'full' },
    { path: ROUTING.HOME_SCREEN, component: HomeScreen },
    { path: ROUTING.REGISTER_SCREEN, component: RegisterScreen },
    { path: ROUTING.LOGIN_SCREEN, component: LoginScreen },
    { path: ROUTING.ABOUT_SCREEN, component: AboutComponent },
    { path: `${ROUTING.CATALOG}/:categoryss`, component: CatalogComponent },
    { path: `${ROUTING.DETAIL_PRODUCT}/:id`, component: DetailProductComponent },
    { path: ROUTING.CART_SCREEN, component: CartComponent },
    { path: ROUTING.PAYMENT_SUCCESS, component: PaymentSuccessComponent },
    { path: ROUTING.PAYMENT_CANCEL, component: PaymentCancelComponent },
    { path: ROUTING.HITORY_ORDER, component: HistoryOrderComponent },
    { path: `${ROUTING.PRODUCT_CATEGORY}/:id`, component: ProductCategoryComponent },
];


export class AppRoutingModule { }

