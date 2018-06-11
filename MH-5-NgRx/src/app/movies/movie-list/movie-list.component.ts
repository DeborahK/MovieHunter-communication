import { Component, OnInit, OnDestroy } from '@angular/core';

import { Movie } from '../movie';

import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

/* NgRx */
import { Store, select } from '@ngrx/store';
import * as fromMovie from '../state/movie.reducer';
import * as movieActions from '../state/movie.actions';

@Component({
  selector: 'mh-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {
  pageTitle = 'Movie List';
  errorMessage$: Observable<string>;
  componentActive = true;

  movies$: Observable<Movie[]>;
  selectedMovie: Movie | null;

  constructor(private store: Store<fromMovie.State>) { }

  ngOnInit(): void {
    // Do NOT subscribe here because it uses an async pipe
    // This gets the initial values until the load is complete.
    this.movies$ = this.store.pipe(select(fromMovie.getMovies)) as Observable<Movie[]>;

    // Do NOT subscribe here because it used an async pipe
    this.errorMessage$ = this.store.pipe(select(fromMovie.getError));

    // Dispatch the load action
    this.store.dispatch(new movieActions.Load());

    // Subscribe here because it does not use an async pipe
    this.store.pipe(
      select(fromMovie.getCurrentMovie),
      takeWhile(() => this.componentActive)
    ).subscribe(
      currentMovie => this.selectedMovie = currentMovie
    );
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  onSelected(movie: Movie): void {
    this.store.dispatch(new movieActions.SetCurrentMovie(movie));
  }
}
