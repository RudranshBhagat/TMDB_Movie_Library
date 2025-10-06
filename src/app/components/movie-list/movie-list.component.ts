import { Component, OnInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { HttpClientModule } from '@angular/common/http';
import gsap from 'gsap';

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

  // Access movie cards
  @ViewChildren('card', { read: ElementRef }) cards!: QueryList<ElementRef>;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadPopular();
  }

  loadPopular() {
    this.movieService.getPopularMovies().subscribe((res: any) => {
      this.movies = res.results;
      setTimeout(() => this.animateCards(), 100); // wait for DOM update
    });
  }

  searchMovies() {
    if (!this.searchQuery) {
      this.loadPopular();
      return;
    }
    this.movieService.searchMovies(this.searchQuery).subscribe((res: any) => {
      this.movies = res.results;
      setTimeout(() => this.animateCards(), 100);
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

private animateCards() {
  if (this.cards && this.cards.length) {
    gsap.fromTo(
      this.cards.map(c => c.nativeElement),
      { opacity: 0, y: 60, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)', // makes cards pop
      }
    );
  }
}

}
