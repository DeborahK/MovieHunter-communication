import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IMovie } from './movie';
import { MovieModule } from './movie.module';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private moviesUrl = 'api/movies';
  private movies: IMovie[];

  private selectedMovieSource = new BehaviorSubject<IMovie | null>(null);
  selectedMovieChanges$ = this.selectedMovieSource.asObservable();

  constructor(private http: HttpClient) { }

  changeSelectedMovie(selectedMovie: IMovie | null): void {
    this.selectedMovieSource.next(selectedMovie);
  }

  getMovies(): Observable<IMovie[]> {
    if (this.movies) {
      return of(this.movies);
    }
    return this.http.get<IMovie[]>(this.moviesUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        tap(data => this.movies = data),
        catchError(this.handleError)
      );
  }

  getMovie(id: number): Observable<IMovie> {
    if (id === 0) {
      return of(this.initializeMovie());
    }
    if (this.movies) {
      const foundItem = this.movies.find(item => item.id === id);
      if (foundItem) {
        return of(foundItem);
      }
    }
    const url = `${this.moviesUrl}/${id}`;
    return this.http.get<IMovie>(url)
      .pipe(
        tap(data => console.log('Data: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  saveMovie(movie: IMovie): Observable<IMovie> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (movie.id === 0) {
      return this.createMovie(movie, headers);
    }
    return this.updateMovie(movie, headers);
  }

  deleteMovie(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const url = `${this.moviesUrl}/${id}`;
    return this.http.delete<IMovie>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteMovie: ' + JSON.stringify(data))),
        tap(data => {
          const foundIndex = this.movies.findIndex(item => item.id === id);
          if (foundIndex > -1) {
            this.movies.splice(foundIndex, 1);
            this.changeSelectedMovie(null);
          }
        }),
        catchError(this.handleError)
      );
  }

  private createMovie(movie: IMovie, headers: HttpHeaders): Observable<IMovie> {
    movie.id = null;
    return this.http.post<IMovie>(this.moviesUrl, movie, { headers: headers })
      .pipe(
        tap(data => console.log('createMovie: ' + JSON.stringify(data))),
        tap(data => {
          this.movies.push(data);
          this.changeSelectedMovie(data);
        }),
        catchError(this.handleError)
      );
  }

  private updateMovie(movie: IMovie, headers: HttpHeaders): Observable<IMovie> {
    const url = `${this.moviesUrl}/${movie.id}`;
    return this.http.put<IMovie>(url, movie, { headers: headers })
      .pipe(
        tap(data => console.log('updateMovie: ' + movie.id)),
        catchError(this.handleError)
      );
  }

  private initializeMovie(): IMovie {
    // Return an initialized object
    return {
      id: 0,
      approvalRating: null,
      description: '',
      director: '',
      imageurl: '',
      mpaa: '',
      price: null,
      releaseDate: '',
      starRating: null,
      title: '',
      category: '',
      tags: []
    };
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
