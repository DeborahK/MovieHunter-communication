import { Component, OnInit } from '@angular/core';

import { Movie } from './movie';
import { MovieService } from './movie.service';

@Component({
    selector: 'mh-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
    pageTitle = 'Movie List';
    errorMessage: string;
    movies: Movie[];
    selectedMovie: Movie | null;

    constructor(private movieService: MovieService) { }

    ngOnInit(): void {
        this.movieService.selectedMovieChanges$.subscribe(
            selectedMovie => this.selectedMovie = selectedMovie
        );

        this.getMovies();
      }

    onSelected(movie: Movie): void {
        this.movieService.changeSelectedMovie(movie);
    }

    getMovies(): void {
        this.movieService.getMovies().subscribe(
            (movies: Movie[]) => this.movies = movies,
            (error: any) => this.errorMessage = <any>error
        );
    }
}
