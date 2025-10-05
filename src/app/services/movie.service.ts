import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private baseUrl = environment.tmdbBaseUrl;
  private token = environment.tmdbToken;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json;charset=utf-8'
    });
  }

  getPopularMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/popular`, {
      headers: this.getHeaders()
    });
  }

  searchMovies(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/movie?query=${query}`, {
      headers: this.getHeaders()
    });
  }
}
