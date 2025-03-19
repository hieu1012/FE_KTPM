import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/Footer/footer.component';
import { HeaderComponent } from './shared/components/Header/header.component';
import { AboutComponent } from './About-Us/about.component';
import { LoginScreen } from './LoginScreen/loginScreen.component';
import { RegisterScreen } from './RegisterScreen/registerScreen.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project-ktpm';
}
