import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuSideComponent } from "./components/menu-side/menu-side.component";
import { NavComponent } from "./components/nav/nav.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuSideComponent, NavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Ecommerce.Frontend';
}
