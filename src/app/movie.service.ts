import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from './movie';
import { MOVIES } from './mock-movies';

@Injectable({
  providedIn: 'root'
})

// Fake API URL


export class MovieService {

  url: string = 'https://jsonplaceholder.typicode.com/users';
  movies: Movie[] = [];

  constructor(private http: Http) {
    this.http.get(this.url).subscribe(data => {
      // Populating usersArray with names from API
      data.json().forEach(element => {
        this.movies.push(element.name);
      });
    });
  }

  getMovie(id: number): Observable<Movie> {
    return of(MOVIES.find(movie => movie.id === id));
  }

  getMovies(): Observable<Movie[]> {
    return of (MOVIES);
  }
}
