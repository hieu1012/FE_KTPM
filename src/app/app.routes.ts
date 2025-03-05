import { Routes } from '@angular/router';
import { LoginScreen } from './shared/LoginScreen/loginScreen.component';
import { RegisterScreen } from './shared/RegisterScreen/registerScreen.component';

export const routes: Routes = [
    { path: '', component: LoginScreen },
    { path: 'register', component: RegisterScreen }
];
