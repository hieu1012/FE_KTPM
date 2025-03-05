import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ROUTING } from '/KienTrucPhanMem/project-ktpm/src/constants/routing'


@Component({
  selector: 'loginScreen',
  imports: [FormsModule, RouterModule],
  templateUrl: './loginScreen.component.html',
  styleUrl: './loginScreen.component.css'
})
export class LoginScreen implements OnInit {
  email: string = '';
  password: string = '';

  onSignIn() {
    // Implement sign-in logic
    console.log('Sign In', this.email, this.password);
  }

  onCreateAccount() {
    // Implement create account logic
    console.log('Create Account');
  }

  ROUTING = ROUTING

  ngOnInit() {
    // cuộn đến đầu trang
    window.scrollTo(0, 0);
  }
}
