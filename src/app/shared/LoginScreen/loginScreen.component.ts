import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'loginScreen',
  imports: [FormsModule, RouterModule],
  templateUrl: './loginScreen.component.html',
  styleUrl: './loginScreen.component.css'
})
export class LoginScreen {
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
}
