import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  styleUrl: './app.component.css',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  title = 'teste-tecnico-frontend';
}
