import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from './movie.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    templateUrl: './movie-shell.component.html'
})
export class MovieShellComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Movies';
    yearCount: number;
    sub: Subscription;

    constructor(private movieService: MovieService) { }

    ngOnInit() {
        this.sub = this.movieService.selectedMovieChanges$.subscribe(selectedMovie => {
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

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
