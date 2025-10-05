import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  watchlist: any[] = [];

  ngOnInit(): void {
    this.loadWatchlist();
  }

  loadWatchlist() {
    this.watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
  }

  removeFromWatchlist(movie: any) {
    this.watchlist = this.watchlist.filter(m => m.id !== movie.id);
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
  }
}
