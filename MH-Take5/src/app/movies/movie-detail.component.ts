import { Component, OnInit } from '@angular/core';

import { IMovie } from './movie';
import { MovieService } from './movie.service';

@Component({
    templateUrl: './movie-detail.component.html',
    styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
    pageTitle: string = 'Movie Detail';
    errorMessage: string;

    get movie(): IMovie | null {
        return this.movieService.currentMovie;
    }

    constructor(private movieService: MovieService) {
    }

    ngOnInit(): void {
    }
}
