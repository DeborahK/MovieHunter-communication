import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { IMovie } from './movie';
import { MovieService } from './movie.service';

@Component({
  selector: 'mh-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  pageTitle: string = 'Movie List';
  errorMessage: string;

  movies: IMovie[];
  @Output() movieSelected = new EventEmitter<IMovie>();
  @Output() addSelected = new EventEmitter();

  get currentMovie(): IMovie | null {
    return this.movieService.currentMovie;
  }

  constructor(private router: Router,
    private movieService: MovieService) { }

  ngOnInit() {
      // Get the array of movies
      this.getMovies();
   }

  getMovies(): void {
    this.movieService.getMovies().subscribe(
      (movies: IMovie[]) => this.movies = movies,
      (error: any) => this.errorMessage = <any>error
    );
  }

  onAdd(): void {
    this.addSelected.emit();
  }

  onSelected(movie: IMovie): void {
    this.movieSelected.emit(movie);
  }
}
