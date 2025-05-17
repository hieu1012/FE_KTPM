import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTING } from '@constants/routing'
import { AuthService } from '@services/auth.service';
import { NgIf } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';


@Component({
  selector: 'header',
  imports: [RouterModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  ROUTING = ROUTING;
  user: any = null;
  isLoggedIn: boolean = false;



  constructor(@Inject(PLATFORM_ID) private platformId: Object, private authService: AuthService) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Load từ localStorage nếu đã login
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && parsedUser.fullName) {
            this.user = parsedUser;
            this.isLoggedIn = true;
          }
        } catch (error) {
          console.error('Lỗi parse user từ localStorage:', error);
        }
      }

    }
  }


  logout() {
    this.authService.logout();
  }

}
