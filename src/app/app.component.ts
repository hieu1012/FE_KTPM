import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/Footer/footer.component';
import { HeaderComponent } from './shared/components/Header/header.component';
import { ChatBoxComponent } from './shared/components/chat-box/chat-box.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ChatBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project-ktpm';
}
