import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { MovieService } from '../movie.service';
import { Movie } from '../movie';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as movieActions from './movie.actions';

@Injectable()
export class MovieEffects {

  constructor(private movieService: MovieService,
    private actions$: Actions) { }

  @Effect()
  loadMovies$: Observable<Action> = this.actions$.pipe(
    ofType(movieActions.MovieActionTypes.Load),
    mergeMap(action =>
      this.movieService.getMovies().pipe(
        map(movies => (new movieActions.LoadSuccess(movies))),
        catchError(err => of(new movieActions.LoadFail(err)))
      )
    )
  );

  @Effect()
  updateMovie$: Observable<Action> = this.actions$.pipe(
    ofType(movieActions.MovieActionTypes.UpdateMovie),
    map((action: movieActions.UpdateMovie) => action.payload),
    mergeMap((movie: Movie) =>
      this.movieService.updateMovie(movie).pipe(
        map(updatedMovie => (new movieActions.UpdateMovieSuccess(updatedMovie))),
        catchError(err => of(new movieActions.UpdateMovieFail(err)))
      )
    )
  );

  @Effect()
  createMovie$: Observable<Action> = this.actions$.pipe(
    ofType(movieActions.MovieActionTypes.CreateMovie),
    map((action: movieActions.CreateMovie) => action.payload),
    mergeMap((movie: Movie) =>
      this.movieService.createMovie(movie).pipe(
        map(newMovie => (new movieActions.CreateMovieSuccess(newMovie))),
        catchError(err => of(new movieActions.CreateMovieFail(err)))
      )
    )
  );

  @Effect()
  deleteMovie$: Observable<Action> = this.actions$.pipe(
    ofType(movieActions.MovieActionTypes.DeleteMovie),
    map((action: movieActions.DeleteMovie) => action.payload),
    mergeMap((movieId: number) =>
      this.movieService.deleteMovie(movieId).pipe(
        map(() => (new movieActions.DeleteMovieSuccess(movieId))),
        catchError(err => of(new movieActions.DeleteMovieFail(err)))
      )
    )
  );
}
