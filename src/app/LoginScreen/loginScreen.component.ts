import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ROUTING } from '/KienTrucPhanMem/project-ktpm/src/constants/routing'

import { Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@services/auth.service';


@Component({
  selector: 'loginScreen',
  imports: [FormsModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './loginScreen.component.html',
  styleUrl: './loginScreen.component.css'
})
export class LoginScreen implements OnInit {
  ROUTING = ROUTING

  email: string = '';
  password: string = '';
  user: any = null;
  loginSuccessMessage: string | null = null;
  loginErrorMessage: string | null = null;

  // Biến lưu thông báo lỗi
  emailError: string | null = null;
  passwordError: string | null = null;


  // Biến để ẩn hiện mật khẩu
  passwordVisible: boolean = false;

  // Hàm kiểm tra email
  validateEmail() {
    if (!this.email) {
      this.emailError = 'Email không được để trống!';
    } else if (!/^\S+@\S+\.\S+$/.test(this.email)) {
      this.emailError = 'Email không hợp lệ!';
    } else {
      this.emailError = null;
    }
  }

  // Hàm kiểm tra mật khẩu
  validatePassword() {
    if (!this.password) {
      this.passwordError = 'Mật khẩu không được để trống!';
    } else if (this.password.length < 6) {
      this.passwordError = 'Mật khẩu phải có ít nhất 6 ký tự!';
    } else {
      this.passwordError = null;
    }
  }

  // Hàm ẩn hiện mật khẩu
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  constructor(private authService: AuthService, @Inject(Router) private router: Router) { }
  onSubmit() {
    // Gọi API đăng nhập từ AuthService 
    // response là đối tượng được trả về từ API đăng nhập
    this.authService.login(this.email, this.password).subscribe(response => {
      if (response && this.authService.getUser()) {
        this.user = this.authService.getUser();
        alert(`Đăng nhập thành công! Xin chào ${this.user.fullName}`);
        this.router.navigate([ROUTING.HOME_SCREEN]);  // Chuyển trang sau khi đăng ký thành công

      } else {
        alert('Đăng nhập thất bại!');
      }
    }, error => {
      alert('Đăng nhập thất bại!');
    });
  }




  ngOnInit() {
    // cuộn đến đầu trang
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }

}
