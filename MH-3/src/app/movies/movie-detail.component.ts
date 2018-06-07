import { Component, OnInit } from '@angular/core';

import { IMovie } from './movie';
import { MovieService } from './movie.service';

@Component({
    selector: 'mh-movie-detail',
    templateUrl: './movie-detail.component.html',
    styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
    pageTitle = 'Movie Detail';
    movie: IMovie | null;
    errorMessage: string;

    constructor(private movieService: MovieService) {
    }

    ngOnInit(): void {
        this.movieService.selectedMovieChanges$.subscribe(
            selectedMovie => this.movie = selectedMovie
        );
    }
}
