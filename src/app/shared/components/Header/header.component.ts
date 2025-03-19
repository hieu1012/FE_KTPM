import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTING } from '@constants/routing'
import { AuthService } from '@services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'header',
  imports: [RouterModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  ROUTING = ROUTING;
  isLoggedIn = false;
  userFullName = '';

  constructor(private authService: AuthService) {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        const user = this.authService.getUser();
        if (user) {
          this.userFullName = user.fullName;
        }
      } else {
        this.userFullName = '';
      }
    });
  }

  logout() {
    this.authService.logout();
  }

}
