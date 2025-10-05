import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MovieCardComponent, HttpClientModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  searchQuery = '';
  viewMode: 'grid' | 'list' | 'compact' = 'grid'; // default view

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadPopular();
  }

  loadPopular() {
    this.movieService.getPopularMovies().subscribe((res: any) => {
      this.movies = res.results;
    });
  }

  searchMovies() {
    if (!this.searchQuery) {
      this.loadPopular();
      return;
    }
    this.movieService.searchMovies(this.searchQuery).subscribe((res: any) => {
      this.movies = res.results;
    });
  }

  addToWatchlist(movie: any) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    if (!watchlist.some((m: any) => m.id === movie.id)) {
      watchlist.push(movie);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }
    alert(`${movie.title} added to watchlist`);
  }

  setView(mode: 'grid' | 'list' | 'compact') {
    this.viewMode = mode;
  }
}
