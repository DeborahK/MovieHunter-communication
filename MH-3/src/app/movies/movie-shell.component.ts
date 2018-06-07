import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';

@Component({
    templateUrl: './movie-shell.component.html'
})
export class MovieShellComponent implements OnInit {
    pageTitle = 'Movies';
    yearCount: number;

    constructor(private movieService: MovieService) { }

    ngOnInit() {
        this.movieService.selectedMovieChanges$.subscribe(selectedMovie => {
            if (selectedMovie) {
                const start = new Date(selectedMovie.releaseDate);
                const now = new Date();
                // Rough approximation
                this.yearCount = now.getFullYear() - start.getFullYear();
            } else {
                this.yearCount = 0;
            }
        });
    }
}
