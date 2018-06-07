import { Movie } from '../movie';

/* NgRx */
import { Action } from '@ngrx/store';

export enum MovieActionTypes {
  SetCurrentMovie = '[Movie] Set Current Movie',
  ClearCurrentMovie = '[Movie] Clear Current Movie',
  InitializeCurrentMovie = '[Movie] Initialize Current Movie',
  Load = '[Movie] Load',
  LoadSuccess = '[Movie] Load Success',
  LoadFail = '[Movie] Load Fail',
  UpdateMovie = '[Movie] Update Movie',
  UpdateMovieSuccess = '[Movie] Update Movie Success',
  UpdateMovieFail = '[Movie] Update Movie Fail',
  CreateMovie = '[Movie] Create Movie',
  CreateMovieSuccess = '[Movie] Create Movie Success',
  CreateMovieFail = '[Movie] Create Movie Fail',
  DeleteMovie = '[Movie] Delete Movie',
  DeleteMovieSuccess = '[Movie] Delete Movie Success',
  DeleteMovieFail = '[Movie] Delete Movie Fail'
}

// Action Creators
export class SetCurrentMovie implements Action {
  readonly type = MovieActionTypes.SetCurrentMovie;

  constructor(public payload: Movie) { }
}

export class ClearCurrentMovie implements Action {
  readonly type = MovieActionTypes.ClearCurrentMovie;
}

export class InitializeCurrentMovie implements Action {
  readonly type = MovieActionTypes.InitializeCurrentMovie;
}

export class Load implements Action {
  readonly type = MovieActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = MovieActionTypes.LoadSuccess;

  constructor(public payload: Movie[]) { }
}

export class LoadFail implements Action {
  readonly type = MovieActionTypes.LoadFail;

  constructor(public payload: string) { }
}

export class UpdateMovie implements Action {
  readonly type = MovieActionTypes.UpdateMovie;

  constructor(public payload: Movie) { }
}

export class UpdateMovieSuccess implements Action {
  readonly type = MovieActionTypes.UpdateMovieSuccess;

  constructor(public payload: Movie) { }
}

export class UpdateMovieFail implements Action {
  readonly type = MovieActionTypes.UpdateMovieFail;

  constructor(public payload: string) { }
}

export class CreateMovie implements Action {
  readonly type = MovieActionTypes.CreateMovie;

  constructor(public payload: Movie) { }
}

export class CreateMovieSuccess implements Action {
  readonly type = MovieActionTypes.CreateMovieSuccess;

  constructor(public payload: Movie) { }
}

export class CreateMovieFail implements Action {
  readonly type = MovieActionTypes.CreateMovieFail;

  constructor(public payload: string) { }
}

export class DeleteMovie implements Action {
  readonly type = MovieActionTypes.DeleteMovie;

  constructor(public payload: number) { }
}

export class DeleteMovieSuccess implements Action {
  readonly type = MovieActionTypes.DeleteMovieSuccess;

  constructor(public payload: number) { }
}

export class DeleteMovieFail implements Action {
  readonly type = MovieActionTypes.DeleteMovieFail;

  constructor(public payload: string) { }
}

// Union the valid types
export type MovieActions =
    SetCurrentMovie
  | ClearCurrentMovie
  | InitializeCurrentMovie
  | Load
  | LoadSuccess
  | LoadFail
  | UpdateMovie
  | UpdateMovieSuccess
  | UpdateMovieFail
  | CreateMovie
  | CreateMovieSuccess
  | CreateMovieFail
  | DeleteMovie
  | DeleteMovieSuccess
  | DeleteMovieFail;

