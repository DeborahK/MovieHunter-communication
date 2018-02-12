import { Component, OnInit } from '@angular/core';

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
    selectedMovie: IMovie | null;

    constructor(private movieService: MovieService) { }

    ngOnInit(): void {
        this.movieService.selectedMovieChanges$.subscribe(
            selectedMovie => this.selectedMovie = selectedMovie
        );
    
        this.getMovies();
      }
    
      onSelected(movie: IMovie): void {
        this.movieService.changeSelectedMovie(movie);
      }

    getMovies(): void {
        this.movieService.getMovies().subscribe(
            (movies: IMovie[]) => this.movies = movies,
            (error: any) => this.errorMessage = <any>error
        );
    }
}
