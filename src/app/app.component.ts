import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuSideComponent } from './components/Other/nav/menu-side/menu-side.component';
import { FooterComponent } from './components/Other/footer/footer.component';
import { NavComponent } from './components/Other/nav/nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuSideComponent, NavComponent, FooterComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Ecommerce.Frontend';
}
