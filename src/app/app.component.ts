import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/">Movies</a> |
      <a routerLink="/watchlist">Watchlist</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    nav { padding: 1rem; background: #222; color: white; }
    nav a { color: white; margin-right: 1rem; text-decoration: none; }
  `]
})
export class AppComponent {}
