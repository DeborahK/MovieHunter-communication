import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';
import { ActivatedRoute, Router } from '@angular/router';

import { IMovie } from './movie';

@Component({
  templateUrl: './movie-shell.component.html'
})
export class MovieShellComponent implements OnInit {
  pageTitle: string = 'Movies';
  errorMessage: string;

  get currentMovie(): IMovie | null {
    return this.movieService.currentMovie;
  }
  set currentMovie(movie: IMovie | null) {
    this.movieService.currentMovie = movie;
  }

  get yearCount(): number {
    let _yearCount = 0;

    if (this.currentMovie && this.currentMovie.releaseDate) {
      const start = new Date(this.currentMovie.releaseDate);
      const now = new Date();
      // Rough approximation
      _yearCount = now.getFullYear() - start.getFullYear();
    }
    return _yearCount;
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private movieService: MovieService) { }

  ngOnInit() {
    // Watch for changes to the parameter
    // This code is required for deep linking
    this.route.params.subscribe(
      param => {
        if (param.hasOwnProperty('id')) {
          const id = +param['id'];
          console.log(id);
          if (!this.currentMovie || this.currentMovie.id !== id) {
            this.getMovie(id);
          }
        }
      }
    );
  }

  // On an add, get an initialized movie
  onAddSelected(): void {
    this.movieService.getMovie(0).subscribe(
      movie => {
        this.currentMovie = movie;
        this.router.navigate(['/movies', movie.id, 'edit']);
      },
      error => this.errorMessage = <any>error
    );
  }

  // On a select, we already have a movie so use it
  onMovieSelected(movie: IMovie): void {
    this.currentMovie = movie;
    this.router.navigate(['/movies', movie.id, 'detail']);
  }

  // On a deep link, get the requested movie
  getMovie(id: number): void {
    this.movieService.getMovie(id).subscribe(
      movie => this.currentMovie = movie,
      error => this.errorMessage = <any>error
    );
  }
}
