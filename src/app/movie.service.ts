import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})

export class MovieService {
  private movieApi = 'https://api.themoviedb.org/3/movie';
  private apiKey = '?api_key=fc4554a1c64f37d7ea7ba6f5d3d04a18';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.movieApi}/popular${this.apiKey}`)
      .pipe(
        catchError(this.handleError<Movie[]>('getMovies', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getMovie(id: number): Observable<Movie> {
    const url = `${this.movieApi}/${id}${this.apiKey}`;
    return this.http.get<Movie>(url).pipe(
      catchError(this.handleError<Movie>(`getMovie id=${id}`))
    );
  }

  searchMovies(term: string): Observable<Movie[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Movie[]>(`${this.movieApi}/?title=${term}`).pipe(
      catchError(this.handleError<Movie[]>('searchMovies', []))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
