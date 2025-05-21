import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ROUTING } from '@constants/routing';
import { AuthService } from '@services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'registerScreen',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './registerScreen.component.html',
  styleUrl: './registerScreen.component.css'
})
export class RegisterScreen {
  ROUTING = ROUTING;

  fullName: string = '';
  email: string = '';
  password: string = '';

  fullNameError: string | null = null;
  emailError: string | null = null;
  passwordError: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }

  validateFullName(): void {
    this.fullNameError = !this.fullName.trim() ? 'Họ và tên không được để trống' : null;
  }

  validateEmail(): void {
    if (!this.email.trim()) {
      this.emailError = 'Email không được để trống';
    } else if (!/\S+@\S+\.\S+/.test(this.email)) {
      this.emailError = 'Email không hợp lệ';
    } else {
      this.emailError = null;
    }
  }

  validatePassword(): void {
    if (!this.password.trim()) {
      this.passwordError = 'Mật khẩu không được để trống';
    } else if (this.password.length < 6) {
      this.passwordError = 'Mật khẩu phải từ 6 ký tự trở lên';
    } else {
      this.passwordError = null;
    }
  }

  onSubmit(): void {
    this.validateFullName();
    this.validateEmail();
    this.validatePassword();

    if (this.fullNameError || this.emailError || this.passwordError) return;

    this.authService.register(this.email, this.password, this.fullName).subscribe({
      next: () => {
        alert(' Đăng ký thành công!');
        this.router.navigate(['/', ROUTING.LOGIN_SCREEN]);
      },
      error: (error) => {
        console.error(error);
        alert(' Đăng ký thất bại. Vui lòng thử lại.');
      }
    });
  }
}