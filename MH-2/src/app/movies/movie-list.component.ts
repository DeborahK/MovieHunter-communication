import { Component, OnInit } from '@angular/core';

import { Movie } from './movie';
import { MovieService } from './movie.service';
import { CriteriaComponent } from '../shared/criteria/criteria.component';

@Component({
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
    pageTitle = 'Movie List';
    errorMessage: string;
    showImage = false;
    includeDetail = true;

    filteredMovies: Movie[];
    movies: Movie[];

    constructor(private movieService: MovieService) { }

    ngOnInit(): void {
        this.getMovies();
    }

    getMovies(): void {
        this.movieService.getMovies().subscribe(
            (movies: Movie[]) => {
                this.movies = movies;
                this.performFilter(null);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    onValueChange(value: string): void {
        this.performFilter(value);
    }

    performFilter(filterBy: string | null): void {
        if (filterBy) {
            filterBy = filterBy.toLocaleLowerCase();
            this.filteredMovies = this.movies.filter((movie: Movie) =>
                movie.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
        } else {
            this.filteredMovies = this.movies;
        }
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
}
