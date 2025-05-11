import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ROUTING } from '@constants/routing'
import { User } from '@models/user.model';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'registerScreen',
  imports: [FormsModule, RouterModule],
  templateUrl: './registerScreen.component.html',
  styleUrl: './registerScreen.component.css'
})
export class RegisterScreen {
  ROUTING = ROUTING
  email: string = '';
  password: string = '';
  fullName: string = '';
  user: User | null = null;
  registerSuccessMessage: string | null = null;
  registerErrorMessage: string | null = null;
  constructor(private authService: AuthService) { }

  // onSubmit() {
  //   this.authService.register(this.email, this.password, this.fullName).subscribe(
  //     (response) => {
  //       if (response) {
  //         this.user = this.authService.getUser();
  //         alert(`Đăng ký thành công!`);
  //       } else {

  //         alert('Đăng ký thất bại!');
  //       }
  //     },
  //     (error) => {
  //       alert('Đăng ký thất bại!');
  //     }
  //   );
  // }


  onSubmit() {
    this.authService.register(this.email, this.password, this.fullName).subscribe({
      next: (response) => {
        console.log('Đăng ký thành công:', response);
      },
      error: (error) => {
        console.error('Lỗi khi đăng ký:', error);
      }
    });
  }


  ngOnInit() {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }

}
