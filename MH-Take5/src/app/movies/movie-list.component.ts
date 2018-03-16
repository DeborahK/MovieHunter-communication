import { Component, OnInit } from '@angular/core';
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

    get selectedMovie(): IMovie | null {
        return this.movieService.currentMovie;
    }

    constructor(private router: Router,
                private movieService: MovieService) { }

    ngOnInit(): void {
        this.getMovies();
    }

    getMovies(): void {
        this.movieService.getMovies().subscribe(
            (movies: IMovie[]) => this.movies = movies,
            (error: any) => this.errorMessage = <any>error
        );
    }

    onSelected(movie: IMovie): void {
        this.movieService.currentMovie = movie;
        // Route to the detail page
        this.router.navigate(['/movies', movie.id]);

    }
}
