import { Movie } from '../movie';

/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MovieActions, MovieActionTypes } from './movie.actions';
import * as fromRoot from '../../state/app.state';

// Extends the app state to include the movie feature.
// This is required because movies are lazy loaded.
// So the reference to MovieState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
  movies: MovieState;
}

// State for this feature (Movie)
export interface MovieState {
  currentMovieId: number | null;
  movies: Movie[];
  error: string;
}

const initialState: MovieState = {
  currentMovieId: null,
  movies: [],
  error: ''
};

const initializedMovie: Movie = {
  id: 0,
  approvalRating: null,
  description: 'TBD',
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

// Selector functions
const getMovieFeatureState = createFeatureSelector<MovieState>('movies');

export const getCurrentMovieId = createSelector(
  getMovieFeatureState,
  state => state.currentMovieId
);

export const getCurrentMovie = createSelector(
  getMovieFeatureState,
  getCurrentMovieId,
  (state, currentMovieId) => {
    if (currentMovieId === 0) {
      return initializedMovie;
    } else {
      return currentMovieId ? state.movies.find(p => p.id === currentMovieId) : null;
    }
  }
);

export const getMovies = createSelector(
  getMovieFeatureState,
  state => state.movies
);

export const getError = createSelector(
  getMovieFeatureState,
  state => state.error
);

export function reducer(state = initialState, action: MovieActions): MovieState {

  switch (action.type) {
    case MovieActionTypes.SetCurrentMovie:
      return {
        ...state,
        currentMovieId: action.payload.id
      };

    case MovieActionTypes.ClearCurrentMovie:
      return {
        ...state,
        currentMovieId: null
      };

    case MovieActionTypes.InitializeCurrentMovie:
      return {
        ...state,
        currentMovieId: 0
      };

    case MovieActionTypes.LoadSuccess:
      return {
        ...state,
        movies: action.payload,
        error: ''
      };

    case MovieActionTypes.LoadFail:
      return {
        ...state,
        movies: [],
        error: action.payload
      };

    case MovieActionTypes.UpdateMovieSuccess:
      const updatedMovies = state.movies.map(
        item => action.payload.id === item.id ? action.payload : item);
      return {
        ...state,
        movies: updatedMovies,
        currentMovieId: action.payload.id,
        error: ''
      };

    case MovieActionTypes.UpdateMovieFail:
      return {
        ...state,
        error: action.payload
      };

    // After a create, the currentMovie is the new movie.
    case MovieActionTypes.CreateMovieSuccess:
      return {
        ...state,
        movies: [...state.movies, action.payload],
        currentMovieId: action.payload.id,
        error: ''
      };

    case MovieActionTypes.CreateMovieFail:
      return {
        ...state,
        error: action.payload
      };

    // After a delete, the currentMovie is null.
    case MovieActionTypes.DeleteMovieSuccess:
      return {
        ...state,
        movies: state.movies.filter(movie => movie.id !== action.payload),
        currentMovieId: null,
        error: ''
      };

    case MovieActionTypes.DeleteMovieFail:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}
