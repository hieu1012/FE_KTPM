import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTING } from '@constants/routing'
import { AuthService } from '@services/auth.service';
import { NgIf } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


import { ClickOutsideDirective } from './click-outside.directive'

import { CategoryService } from '@services/category.service';

@Component({
  selector: 'header',
  imports: [RouterModule, NgIf, ClickOutsideDirective, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, public router: Router, private authService: AuthService, private categoryService: CategoryService) { }


  ROUTING = ROUTING;
  user: any = null;
  isLoggedIn: boolean = false;
  categories: any[] = [];

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  dropdownVisible: boolean = false;


  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  closeDropdown(): void {
    this.dropdownVisible = false;
  }

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

    // Lấy danh sách danh 
    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
      error: (error) => {
        console.error('Lỗi khi lấy danh sách danh mục:', error);
      }
    });
  }


  logout() {
    this.authService.logout();
  }

}
