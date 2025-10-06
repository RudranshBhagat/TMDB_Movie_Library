import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  searchQuery = '';
  viewMode: 'grid' | 'list' = 'grid';
  isLoading = false;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.loadPopular();
  }

  loadPopular() {
    this.isLoading = true;
    this.movieService.getPopularMovies().subscribe({
      next: (res: any) => {
        this.movies = res.results;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading movies:', err);
        this.isLoading = false;
      }
    });
  }

  searchMovies() {
    if (!this.searchQuery.trim()) {
      this.loadPopular();
      return;
    }

    this.isLoading = true;
    this.movieService.searchMovies(this.searchQuery).subscribe({
      next: (res: any) => {
        this.movies = res.results;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error searching movies:', err);
        this.isLoading = false;
      }
    });
  }

  addToWatchlist(movie: any) {
    console.log('Adding to watchlist:', movie);

    try {
      // Get current watchlist from localStorage
      let watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');

      // Check if movie already exists
      const exists = watchlist.some((m: any) => m.id === movie.id);

      if (!exists) {
        watchlist.push(movie);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        this.showSuccessMessage(`${movie.title} added to watchlist!`);
      } else {
        this.showInfoMessage(`${movie.title} is already in your watchlist`);
      }
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      this.showErrorMessage('Failed to add to watchlist');
    }
  }

  setView(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }

  private showSuccessMessage(message: string) {
    alert(message);
  }

  private showInfoMessage(message: string) {
    alert(message);
  }

  private showErrorMessage(message: string) {
    alert(message);
  }
}