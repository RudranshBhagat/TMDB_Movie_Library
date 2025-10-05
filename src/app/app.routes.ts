import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';

export const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: 'watchlist', component: WatchlistComponent }
];
