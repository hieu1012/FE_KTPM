import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTING } from '@constants/routing'

@Component({
  selector: 'header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  ROUTING = ROUTING

}
