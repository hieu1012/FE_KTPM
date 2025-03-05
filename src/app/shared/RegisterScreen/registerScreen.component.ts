import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'registerScreen',
  imports: [FormsModule],
  templateUrl: './registerScreen.component.html',
  styleUrl: './registerScreen.component.css'
})
export class RegisterScreen {
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
