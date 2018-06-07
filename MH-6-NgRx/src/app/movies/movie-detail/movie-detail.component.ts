import { Component, OnInit, OnDestroy } from '@angular/core';

import { Movie } from '../movie';

import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

/* NgRx */
import { Store, select } from '@ngrx/store';
import * as fromMovie from '../state/movie.reducer';

@Component({
  selector: 'mh-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  pageTitle = 'Movie Detail';
  movie: Movie | null;
  errorMessage$: Observable<string>;
  componentActive = true;

  constructor(private store: Store<fromMovie.State>) { }

  ngOnInit(): void {
    // Subscribe here because it does not use an async pipe
    this.store.pipe(
      select(fromMovie.getCurrentMovie),
      takeWhile(() => this.componentActive)
    ).subscribe(
      currentMovie => this.movie = currentMovie
    );
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

}
