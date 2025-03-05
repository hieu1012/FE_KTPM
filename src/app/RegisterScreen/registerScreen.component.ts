import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ROUTING } from '@constants/routing'

@Component({
  selector: 'registerScreen',
  imports: [FormsModule, RouterModule],
  templateUrl: './registerScreen.component.html',
  styleUrl: './registerScreen.component.css'
})
export class RegisterScreen {
  ROUTING = ROUTING

}
