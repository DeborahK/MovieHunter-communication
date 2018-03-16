import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';

@Component({
  templateUrl: './movie-shell.component.html'
})
export class MovieShellComponent implements OnInit {
  pageTitle: string = 'Movies';

  get yearCount(): number {
    const currentMovie = this.movieService.currentMovie;
    let _yearCount = 0;

    if (currentMovie && currentMovie.releaseDate) {
      const start = new Date(currentMovie.releaseDate);
      const now = new Date();
      // Rough approximation
      _yearCount = now.getFullYear() - start.getFullYear();
    }
    return _yearCount;
  }

  constructor(private movieService: MovieService) { }

  ngOnInit() {
  }
}
