import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

/* NgRx */
import { Store, select } from '@ngrx/store';
import * as fromMovie from '../state/movie.reducer';

@Component({
  templateUrl: './movie-shell.component.html'
})
export class MovieShellComponent implements OnInit, OnDestroy {
  pageTitle = 'Movies';
  yearCount: number;
  errorMessage$: Observable<string>;
  componentActive = true;

  constructor(private store: Store<fromMovie.State>) { }

  ngOnInit() {
    // Subscribe here because it does not use an async pipe
    this.store.pipe(
      select(fromMovie.getCurrentMovie),
      takeWhile(() => this.componentActive)
    ).subscribe(
      currentMovie => {
        if (currentMovie) {
          const start = new Date(currentMovie.releaseDate);
          const now = new Date();
          // Rough approximation
          this.yearCount = now.getFullYear() - start.getFullYear();
        } else {
          this.yearCount = 0;
        }
      });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

}
