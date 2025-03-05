import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginScreen } from './LoginScreen/loginScreen.component';
import { RegisterScreen } from './RegisterScreen/registerScreen.component';
import { HomeScreen } from './HomeScreen/homeScreen.component';
import { ROUTING } from '../constants/routing';
import { AboutComponent } from './shared/About-Us/about.component';

export const routes: Routes = [
    { path: ROUTING.HOME_SCREEN, component: HomeScreen },
    { path: ROUTING.REGISTER_SCREEN, component: RegisterScreen },
    { path: ROUTING.LOGIN_SCREEN, component: LoginScreen },
    { path: ROUTING.ABOUT_SCREEN, component: AboutComponent }
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'top', // Đảm bảo cuộn lên đầu khi chuyển route
            anchorScrolling: 'enabled', // Kích hoạt cuộn theo thẻ anchor nếu có
        })

    ],
    exports: [RouterModule],
})
export class AppRoutingModule { }

